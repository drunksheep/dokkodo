import IntroBlock from '../IntroBlock';
import ResultList from '../ResultList';
import styles from './style.module.scss';

export default function Form() {
    return (
        <form className={styles.main}>
            <IntroBlock />
            <input type="text" name="url" value="" placeholder="Insira a URL" />
            <button>ENVIAR</button>
            <ResultList />
        </form>
    )
}
