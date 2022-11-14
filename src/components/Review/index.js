import React from 'react';
import s from './Review.module.css';

class Review extends React.Component {

    render() {
        const { name, paragraph } = this.props;

        return (
            <div className={s.review}>
                <div className={s.reviewName}>
                    <p>
                        {name}
                    </p>
                </div>
                <div className={s.reviewParagraph}>
                    <p>
                        {paragraph}
                    </p>
                </div>
            </div>
        )
    }
}

export default Review;
