import { useContext } from 'react';
import React from 'react';
import Image from 'next/image';
import { Box, Icon, Flex } from '@chakra-ui/react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';

const LeftArrow = () => {
//   const { scrollPrev } = useContext(VisibilityContext);
    const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);

  return (
    <Flex justifyContent='center' alignItems='center' marginRight='1'>
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => scrollPrev()}
        fontSize='2xl'
        cursor='pointer'
        d={['none','none','none','block']}
      />
    </Flex>
  );
}

const RightArrow = () => {
//   const { scrollNext } = useContext(VisibilityContext);
const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <Flex justifyContent='center' alignItems='center' marginLeft='1'>
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => scrollNext()}
        fontSize='2xl'
        cursor='pointer'
        d={['none','none','none','block']}
    />
    </Flex>
  );
}

export default function ImageSrollbar({ data }) {
  return (
    <>
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} style={{ overflow: 'hidden' }} >
        {data.map((item) => (
            <Box width='910px' itemId={item.id} overflow='hidden' p='1'>
            <Image placeholder="blur" blurDataURL={item.url} src={item.url} width={1000} height={500}  sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px" />
            </Box>
        ))}
        </ScrollMenu>
        {/* <Carousel autoPlay infiniteLoop showArrows={false} showIndicators={false} showStatus={false} showThumbs={false}> */}
                {/* <img src={img1} alt=""/> */}
                {/* <Box width='910px' itemId={item.id} overflow='hidden' p='1'>
                    <Image placeholder="blur" blurDataURL={item.url} src={item.url} width={1000} height={500}  sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px" />
                </Box> */}
            {/* {data.map((item) => (
                <div key = {item.id} style={{width:'910px'}}>
                    <img src={item.url} placeholder="blur" blurDataURL={item.url} width={1000} height={500}  sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"/>
                </div>
            ))}
        </Carousel> */}
    </>
  );
}