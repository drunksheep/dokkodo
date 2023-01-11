import styles from './style.module.scss';

type imageItem = {
    url: string;
}

type imageList = imageItem[];

export default function ResultList(props: imageList = []) {
    return (
        <ul className={styles.imageListing} />
    )
}
