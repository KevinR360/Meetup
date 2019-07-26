import { parseISO } from 'date-fns';
import Meetup from '../models/Meetup';

class MeetupController {
  async store(req, res) {
    const { filename: banner } = req.file;

    const { title, description, location } = req.body;

    const date = parseISO(req.body.date);

    console.log('chegou aqui');
    console.log([banner, title, description, location, date]);

    const meetups = await Meetup.create({
      title,
      description,
      location,
      date,
      banner,
      provider_id: req.userId,
    });

    return res.json(meetups);
  }
}

export default new MeetupController();
