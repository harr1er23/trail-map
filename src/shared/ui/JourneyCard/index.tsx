import { Card, Group, Image, Text } from '@mantine/core';
import classes from './journey-card.module.css';

interface JourneyCardProps {
  country: string;
  city: string;
  description?: string | undefined; 
  image?: string | undefined;
  date: [string | null, string | null];
  onClick?: () => void;
}

export const JourneyCard: React.FC<JourneyCardProps> = ({ country, city, date, description, image, onClick }) => {
  return (
    <Card onClick={() => onClick?.()} withBorder radius="md" p={0} className={classes.card + ' cursor-pointer'}>
      <Image
        src={image ? image : "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"}
        className={classes.image}
      />
      <div className={classes.body}>
        <Text 
          tt="uppercase" 
          c="dimmed" 
          fw={700} 
          size="xs" 
          className='hover:text-sky-700'>
            {country ? `${ country }, ${ city }` : 'Новое путешествие'}
        </Text>
        <Text className={classes.title} mt="xs" mb="md" lineClamp={2}>
          { description }
        </Text>
        <Group wrap="nowrap" gap="xs">
          <Text size="xs" c="dimmed">
            { date[0] }
          </Text>
          <Text size="xs" c="dimmed">
            •
          </Text>
          <Text size="xs" c="dimmed">
            { date[1] }
          </Text>
        </Group>
      </div>
    </Card>
  );
}