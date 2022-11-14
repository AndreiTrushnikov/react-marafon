import React, { Component } from 'react';
import s from './CardList.module.css';
import Card from '../Card';
import { Input } from 'antd';
import getTranslateWord from '../../service/dictionary';

const { Search } = Input;
class CardList extends Component {
    state = {
        newEngWord: '',
        newRusWord: '',
        isBusy: false
    }

    // Обработчик ввода в инпут с английскими словами
    handleInputChangeENG = (e) => {
        this.setState({
            newEngWord: e.target.value,
        })
    }

    // Получение перевода слова
    getTheWord = async () => {
        const { newEngWord } = this.state;
        const getWord = await getTranslateWord(this.state.newEngWord);
        this.setState ({
            newEngWord: `${newEngWord}`,
            newRusWord: `${getWord.translate}`,
            isBusy: false
        })
        this.props.onCreated(this.state.newEngWord, this.state.newRusWord)
    }

    // Обработчик формы
    handleSubmitForm = async () => {
        this.setState({
            isBusy: true,
        }, this.getTheWord)
    }

    render() {
        const { item = [], onDeletedItem } = this.props;
        const { value, isBusy } = this.state;
        return (
            <div className="container">
                <div className={s.formBlock}>
                    <div className={s.form}>
                    <Search
                        placeholder="Введите слово на английском"
                        enterButton="Search"
                        size="large"
                        value={value}
                        loading={isBusy}
                        onChange={this.handleInputChangeENG}
                        onSearch={this.handleSubmitForm}
                        />
                    </div>
                </div>
                <div className={s.root}>
                {
                    item.map(({ eng, rus, id }) => (
                        <Card 
                            onDeleted={() => {
                                onDeletedItem(id);
                            }}
                            key={id}
                            eng={eng}
                            rus={rus} 
                        />
                    ))
                }
                </div>
            </div>
        )
    }

}

export default CardList;
