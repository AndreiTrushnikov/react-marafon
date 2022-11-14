import React from 'react';
import s from './FooterBlock.module.css';

const FooterBlock = ({ linkTo, linkToName }) => {
    return (
        <div className={s.footer}>
            <div className="container">
                <a href={linkTo} className={s.footerLink} target="_blank" rel="noopener noreferrer">
                    {linkToName}
                </a>
            </div>
        </div>
    )
}

export default FooterBlock;
