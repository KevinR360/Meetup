import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class ScheduleController {
  async index(req, res) {
    const { date } = req.query;

    const { page = 1 } = req.query;
    /**
     * List by dates
     */

    if (!date) {
      return res.status(401).json({ error: 'Date not informed' });
    }

    const parsedDate = parseISO(date);

    const meetups = await Meetup.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
      attributes: ['id', 'title', 'description', 'location', 'date'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name'],
        },
        {
          model: File,
          as: 'file',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    return res.json(meetups);
  }
}

export default new ScheduleController();
