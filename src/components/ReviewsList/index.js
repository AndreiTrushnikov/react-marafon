import React from 'react';
import Review from '../Review';
import s from './ReviewsList.module.css';

const ReviewsList = ({ review = [], children}) =>  {
    return (
        <div className="container">
            <div className={s.reviewsWrap}>
                {children}
                {
                    review.map(({ name, paragraph }, index) => (
                        <Review name={name} paragraph={paragraph} key={index} />
                    ))
                }
            </div>
        </div>
    )
}


export default ReviewsList;