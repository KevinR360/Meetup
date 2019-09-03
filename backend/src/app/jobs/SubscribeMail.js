import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class SubscribeMail {
  get key() {
    return 'SubscribeMail';
  }

  async handle({ data }) {
    const { meetup, user, today } = data;

    console.log('A fila executou!');

    await Mail.sendMail({
      to: `${meetup.author.name} <${meetup.author.email}>`,
      subject: `Inscrição no evento ${meetup.title}`,
      template: 'subscribe',
      context: {
        author: meetup.author.name,
        user: user.name,
        date: format(parseISO(today), "dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new SubscribeMail();
