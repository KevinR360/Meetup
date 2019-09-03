import React, {useState, useMemo, useEffect} from 'react';
import {format, subDays, addDays, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  ViewDate,
  Left,
  DateText,
  Right,
  MeetupsList,
  Meetup,
  Banner,
  Title,
  Infos,
  DateMeetup,
  AddressMeetup,
  Author,
  SubscribeButton,
  MeetupEmpty,
  EmptyText,
} from './styles';
import Header from '~/components/Header';
import Background from '~/components/Background';
import api from '~/services/api';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormated = useMemo(
    () => format(date, "d 'de' MMMM", {locale: pt}),
    [date],
  );

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('schedule', {
        params: {date},
      });

      const data = response.data.map(meetup => ({
        ...meetup,
        dateMeetupFormated: format(parseISO(meetup.date), "d 'de' MMMM", {
          locale: pt,
        }),
      }));

      setMeetups(data);
    }

    loadMeetups();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  async function handleSubscribe(id) {
    await api.post(`subscribe/${id}`);
  }

  return (
    <Background>
      <Header />
      <Container>
        <ViewDate>
          <Left onPress={handlePrevDay}>
            <Icon
              name="chevron-left"
              size={30}
              color="rgba(255, 255, 255, 0.7)"
            />
          </Left>
          <DateText>{dateFormated}</DateText>
          <Right onPress={handleNextDay}>
            <Icon
              name="chevron-right"
              size={30}
              color="rgba(255, 255, 255, 0.7)"
            />
          </Right>
        </ViewDate>

        {meetups.length > 0 ? (
          <MeetupsList
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => (
              <Meetup>
                <Banner
                  source={{
                    uri: item.file
                      ? `http://10.0.3.2:3333/files/${item.file.path}`
                      : 'https://api.adorable.io/avatars/150/abott@adorable.png',
                  }}
                />
                <Title>{item.title}</Title>
                <Infos>
                  <DateMeetup>{item.dateMeetupFormated}</DateMeetup>
                  <AddressMeetup>{item.location}</AddressMeetup>
                  <Author>{`Organizador: ${item.author.name}`}</Author>
                </Infos>
                <SubscribeButton onPress={() => handleSubscribe(item.id)}>
                  Realizar Inscrição
                </SubscribeButton>
              </Meetup>
            )}
          />
        ) : (
          <MeetupEmpty>
            <Icon
              name="event-busy"
              size={150}
              color=" rgba(255, 255, 255, 0.5)"
            />
            <EmptyText>Que pena não há eventos nessa data!</EmptyText>
          </MeetupEmpty>
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({tintColor}) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
