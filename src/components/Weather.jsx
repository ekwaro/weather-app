import { Card, Title, Text, Group, Badge, Image, Divider } from "@mantine/core";

const Weather = ({ city, temperature, condition, icon }) => {
  return (
    <Card padding="lg" withBorder shadow="lg" radius="md" m="md">
      <Card.Section>
        <Image src={icon} height={160}/>
      </Card.Section>
      <Divider mx='lg' my='xs'/>
      <Group justify='space-between' mt='md'>
        <Text>City</Text>
        <Text c="dimmed">{city}</Text>
      </Group>

      <Group>
        <Text>Condition:</Text>
        <Text c="dimmed">{condition}</Text>
      </Group>
      <Group justify='space-between'>
        <Text>Temp:</Text>
        <Badge>{temperature}°C</Badge>
      </Group>
    </Card>
  );
};

export default Weather;
