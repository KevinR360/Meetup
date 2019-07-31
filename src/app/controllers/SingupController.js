import { startOfDay, isBefore, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import User from '../models/User';
import Subscribers from '../models/Subscribers';
import Notification from '../schemas/Notifications';

class SingupController {
  async index(req, res) {
    const subscribers = await Subscribers.findAll({
      where: { subs_id: req.userId },
      attributes: ['id', 'meetup_id'],
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['title', 'description', 'location', 'date', 'banner'],
        },
      ],
    });

    return res.json(subscribers);
  }

  async store(req, res) {
    const { id } = req.params;

    const meetup = await Meetup.findByPk(id);
    // Check Event
    if (!meetup) {
      return res.status(400).json({ error: 'This event does not exist' });
    }

    if (meetup.provider_id === req.userId) {
      return res
        .status(401)
        .json({ error: 'You are not allowed to register for your own event.' });
    }

    // Check if the event has passed
    const today = new Date();
    const dateevent = startOfDay(meetup.date);
    if (isBefore(dateevent, startOfDay(today))) {
      return res.status(401).json({ error: 'This event has passed.' });
    }

    // Check subscription
    const subs = await Subscribers.findOne({
      where: { meetup_id: id, subs_id: req.userId },
    });

    if (subs) {
      return res
        .status(401)
        .json({ error: 'You are already registered for the event.' });
    }

    // Check dates
    const eventsub = await Subscribers.findAll({
      where: { subs_id: req.userId },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            date: {
              [Op.between]: [startOfDay(meetup.date), endOfDay(meetup.date)],
            },
          },
        },
      ],
    });

    if (eventsub.length > 0) {
      return res.status(401).json({ error: 'This is not allowed' });
    }

    const sub = await Subscribers.create({
      meetup_id: id,
      subs_id: req.userId,
    });

    /**
     * Notify provider
     */

    const user = await User.findByPk(req.userId);

    await Notification.create({
      content: `${user.name} acabou de se inscrever no seu evento ${meetup.title}`,
      user: meetup.provider_id,
    });

    return res.json(sub);
  }

  async delete(req, res) {
    const subscribers = await Subscribers.findOne({
      where: { meetup_id: req.params.id, subs_id: req.userId },
    });

    subscribers.destroy();

    return res.json({ cancel: 'Inscrição cancelada!' });
  }
}
export default new SingupController();
