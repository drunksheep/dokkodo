import IntroBlock from '../IntroBlock';
import ResultList from '../ResultList';
import styles from './style.module.scss';
import { useForm } from "react-hook-form";
import randomQuote from '../../utils/randomQuote';
import { quoteProps } from '../../types/quoteProps';

type FormProps = {
    quote: string
}

export default function Form(props: FormProps) {

    const quote = randomQuote();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    async function submit(data: any) {
        console.log(data)

        await fetch('/api/getImages', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            })
        })
            .then(res => res.json())
            .then((res: any) => {
                console.log(res)
            })
    }


    return (
        <form className={styles.main} onSubmit={handleSubmit(submit)}>
            <IntroBlock quote={props.quote} />
            <input type="text" placeholder="Insira a URL" {...register('url', { required: true })} />
            <button>ENVIAR</button>
            {/* <ResultList imageList={[]} /> */}
        </form>
    )
}
