import React from 'react';
import { Ratio } from 'react-bootstrap';

interface NameAvatarProps {
    src: string;
    alt: string;
}

const NameAvatar: React.FC<NameAvatarProps> = ({ src, alt }) => {
    return (
        <Ratio aspectRatio="1x1" className='img-box'>
            <img className="" src={src} alt={alt} />
        </Ratio>
    );
};

export default NameAvatar;
