import { parseISO, startOfDay, isBefore, isToday } from 'date-fns';
import * as Yup from 'yup';
import Meetup from '../models/Meetup';
import User from '../models/User';
import Subscribers from '../models/Subscribers';

class MeetupController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: { provider_id: req.userId },
      order: ['date'],
      attributes: ['id', 'title', 'description', 'location', 'date', 'banner'],
      limit: 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    // Verificando campos de entrada
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { filename: banner } = req.file;

    const { title, description, location } = req.body;

    const date = parseISO(req.body.date);

    // Check for past dates
    const dayStart = startOfDay(date);

    if (isBefore(dayStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const meetup = await Meetup.create({
      title,
      description,
      location,
      date,
      banner,
      provider_id: req.userId,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const meetup = await Meetup.findByPk(id);

    // Disallow changing past events
    const dateMeet = await meetup.date;

    if (isBefore(dateMeet, new Date())) {
      return res
        .status(400)
        .json({ error: 'Past dates are not permitted update' });
    }

    // Check for past dates
    const data = parseISO(req.body.date);
    const dayStart = startOfDay(data);

    if (isBefore(dayStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    // Check update banner
    const { file } = req;

    if (!file) {
      const {
        title,
        description,
        location,
        date,
        banner,
      } = await meetup.update(req.body);

      return res.json({
        id,
        title,
        description,
        location,
        date,
        banner,
      });
    }

    const { title, description, location, date, banner } = await meetup.update({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      date: parseISO(req.body.date),
      banner: req.file.filename,
    });

    return res.json({
      id,
      title,
      description,
      location,
      date,
      banner,
    });
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    if (req.userId !== meetup.provider_id) {
      return res.status(401).json({ error: "You don't have permission." });
    }

    const date = startOfDay(meetup.date);
    const today = startOfDay(new Date());

    if (isBefore(date, today)) {
      return res.status(400).json({ error: 'You cannot cancel a past event.' });
    }

    if (isToday(date)) {
      return res
        .status(400)
        .json({ error: 'You cannot cancel an ongoing event.' });
    }

    const subscribes = await Subscribers.findAll({
      where: { meetup_id: req.params.id },
    });

    if (subscribes.length > 0) {
      Subscribers.destroy({
        where: { meetup_id: req.params.id },
      });
    }

    meetup.destroy();

    return res.json({ ok: true });
  }
}

export default new MeetupController();
