import React from 'react';
import cl from 'classnames';
import s from './Card.module.scss';
import { CheckSquareOutlined, DeleteOutlined } from '@ant-design/icons';
class Card extends React.Component {
    state = {
        done: false,
        isRemembered: false,
    }

    // Обработчик клика по карточке
    handleCardClick = () => {
        this.setState( ({done, isRemembered}) => {
            if (isRemembered === true) {
                return
            } else {
            return {
                done: !done
            }
        }
        });
    }

    // Обработчик клика по галке
    handleIsRememberClick = () => {
        this.setState( () => {
            return {
                isRemembered: true,
                done: true
            }
        });
    }

    // Обработчик клика по кнопке удаления карточки
    handleDeletedClick = () => {
        this.props.onDeleted();
    }

    render() {
        const { eng, rus } = this.props;
        const { done, isRemembered } = this.state;

        return (
            <div className={s.root}>
                <div
                    className={ cl(s.card,
                                {[s.done]: done},
                                {[s.isRemembered]: isRemembered}) }
                    onClick={this.handleCardClick}
                    >
                    <div className={s.cardInner}>
                        <div className={s.cardFront}>
                            { eng }
                        </div>
                        <div className={s.cardBack}>
                            { rus }
                        </div>
                    </div>
                </div>
                <div className={s.icons}>
                    <CheckSquareOutlined onClick={this.handleIsRememberClick}/>
                </div>
                <div className={s.icons}>
                    <DeleteOutlined onClick={this.handleDeletedClick}/>
                </div>
            </div>
        );
    }
}

export default Card;