import Image from 'next/image';
import { Heading, Text } from './base';

const ImageText = () => {
  return (
    <div className="flex gap-10">
      <div className="flex-1 w-full relative">
        <Image src={'/img/Dados.svg'} fill className="rounded-lg object-cover h-auto w-auto" alt="" />
      </div>
      <div className="flex-1">
        <Heading headingLevel={2} size="H1" className="font-bold text-grayDark2 mb-9">
          Consectetur adipiscing elit Suspendisse non odio
        </Heading>
        <Text size="B1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus tellus sed velit imperdiet,
          non pharetra orci volutpat. Vestibulum ultricies massa at ligula maximus, ullamcorper vestibulum
          enim auctor. Aenean purus felis, lobortis ultrices mi at, ultrices dignissim justo. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Mauris tempus tellus sed velit imperdiet, non pharetra
          orci volutpat. Vestibulum ultricies massa at ligula maximus, ullamcorper.
        </Text>
      </div>
    </div>
  );
};

export default ImageText;
