import { Image } from '@mantine/core';

const HEIGHT_IMAGE = 50;

export const UnSignedHeader = () => (
  <header>
    <div className='container'>
      <nav className='flex items-center'>
        <Image
          h={HEIGHT_IMAGE}
          src='./images/whitelogo.png'
          className='mb-10 w-auto object-contain'
        />
      </nav>
    </div>
  </header>
);
