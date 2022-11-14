import React from 'react';
import s from './BannerBlock.module.css';

const BannerBlock = ({ bannerText }) => {
    return (
        <div className={s.bannerWrap}>
            <div className="container">
                <div className={s.bannerParagraph}>
                    <p className={s.bannerParagraphSelf}>
                       {bannerText}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BannerBlock;
