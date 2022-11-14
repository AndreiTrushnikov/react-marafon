import React from 'react';
import s from './ContentBlock.module.css';
import contentImg from './img/words.jpeg';
import contentImgR from './img/typewriter.jpg';

const ContentBlock = ({ title, paragraph, styleRevert, contentImgRevert }) => {
    let revert = '';
    if (styleRevert) {
        revert = 'styleRevert';
    } else {
        revert = '';
    }
    return (
        <div className="container">
            <div className={s.contentWrap + ' ' + revert}>
                <div className={s.contentParagraph}>
                    {title ? <h1 className={s.contentTitle}>{title}</h1> : null}
                    <p className={s.contentParagraphSelf}>
                        {paragraph}
                    </p>
                </div>
                <div className={s.contentImg}>
                    {contentImgRevert ? <img src={contentImgR} alt=""></img> : <img src={contentImg} alt=""></img>}
                </div>
            </div>
        </div>
    )
}

export default ContentBlock;