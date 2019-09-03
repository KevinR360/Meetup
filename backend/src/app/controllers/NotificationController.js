import Notification from '../schemas/Notifications';

class NotificationController {
  async index(req, res) {
    const notifications = await Notification.find({
      user: req.userId,
    });

    return res.json(notifications);
  }

  async update(req, res) {
    const notifications = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.json(notifications);
  }
}

export default new NotificationController();
