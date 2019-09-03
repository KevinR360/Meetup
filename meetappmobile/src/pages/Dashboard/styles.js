import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const ViewDate = styled.View`
  align-self: stretch;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
`;

export const Left = styled.TouchableOpacity``;

export const DateText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin: 0 20px;
`;

export const Right = styled.TouchableOpacity``;

export const MeetupsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  margin-top: 30px;
`;

export const Meetup = styled.View`
  width: 335;
  background: #fff;
  margin-bottom: 30px;
  border-radius: 4px;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 150px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Title = styled.Text`
  margin: 10px 20px;
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

export const Infos = styled.View`
  padding: 0 35px;
`;

export const DateMeetup = styled.Text`
  font-size: 14px;
  color: #999;
  margin-bottom: 5px;
`;

export const AddressMeetup = styled.Text`
  font-size: 14px;
  color: #999;
  margin-bottom: 5px;
`;

export const Author = styled.Text`
  font-size: 14px;
  color: #999;
  margin-bottom: 5px;
`;

export const SubscribeButton = styled(Button)`
  height: 40px;
  align-self: stretch;
  margin: 20px;
`;

export const MeetupEmpty = styled.View`
  height: 345;
  width: 335;
  background: rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
`;
