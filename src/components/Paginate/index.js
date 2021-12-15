import { IonButton } from '@ionic/react';
import PropTypes from 'prop-types'

import './style.scss'

const Gap = () => {
    return <div className='paginate-container__gap'>
        ...
    </div>
}

// {count,
//  pages,
//  last,
//  prev,
//  next,
//  series,}
const Index = ({
    isSuccess,
    isFetching,
    pagy,
    setPage
}) => {
    const {
        page,
        next,
        prev,
        last,
        series,
    } = pagy

    const handleChangePageClick = (pageIndicator) => {
        setPage(pageIndicator)
    }

    let Content
    if (isSuccess) {
        Content = <>
            {series.map((value, index) => {
                if (typeof value === 'string') {
                    if (value === 'gap') {
                        return <Gap key={index} />
                    }
                    return <div
                        key={index}
                        className='paginate-container__current-page-indicator'>
                        {value}
                    </div>
                } else {
                    return <div
                        key={index}
                        className='paginate-container__page-indicator'
                        onClick={() => handleChangePageClick(value)}
                    >
                        {value}
                    </div>
                }
            })}
        </>
    }

    return (
        <div className='paginate-container'>
            <IonButton
                onClick={() => handleChangePageClick(1)}
                disabled={isFetching || page === 1}
            >
                First
            </IonButton>

            <IonButton
                onClick={() => handleChangePageClick(prev)}
                disabled={isFetching || !prev}
            >
                Prev
            </IonButton>

            {Content}

            <IonButton
                onClick={() => handleChangePageClick(next)}
                disabled={isFetching || !next}
            >
                Next
            </IonButton>

            <IonButton
                onClick={() => handleChangePageClick(last)}
                // next
                disabled={isFetching || !next}
            >
                Last
            </IonButton>
        </div>
    )
}

Index.propTypes = {
    isSuccess: PropTypes.bool,
    isFetching: PropTypes.bool,
    pagy: PropTypes.object,
    setPage: PropTypes.func,
}

Index.defaultProps = {
    pagy: {}
}

export default Index
