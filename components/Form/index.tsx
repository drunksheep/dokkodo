import IntroBlock from '../IntroBlock';
import ResultList from '../ResultList';
import styles from './style.module.scss';
import { useForm } from "react-hook-form";

export default function Form() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    async function submit(data : any) {
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
        .then( (res : any)  => {
            console.log(res)
        })
    }


    return (
        <form className={styles.main} onSubmit={handleSubmit(submit)}>
            <IntroBlock />
            <input type="text" name='url' placeholder="Insira a URL" {...register('url', {required: true})} />
            <button>ENVIAR</button>
              <ResultList />
        </form>
    )
}
