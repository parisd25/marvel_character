import React from "react";
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseName, choosePrice } from '../../redux/slices/rootSlice';
import { Input } from "../sharedComponents";
import { Button } from '@material-ui/core';
import { server_calls } from "../../api";
import { useGetData } from "../../custom-hooks";

interface CarFormProps {
    id?:string;
    data?: {};
}

interface CarState {
    name: string;
    price: string;
}


export const CarForm = ( props:CarFormProps ) => {
    const dispatch = useDispatch();

    let { carData, getData } = useGetData();

    const store = useStore();

    const name = useSelector<CarState>(state => state.name)
    const price = useSelector<CarState>(state => state.price)

    const { register, handleSubmit } = useForm({ })

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await server_calls.update(props.id!, data)
            window.location.reload()
            console.log(`updated: ${data} ${props.id}`)
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            dispatch(choosePrice(data.price))
            await server_calls.create(store.getState())
            window.location.reload()
        }
    }

    return(
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Car Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <Input {...register('price')} name="price" placeholder="Price" />
                </div>
                <div>
                    <label htmlFor="car_model">Car Model</label>
                    <Input {...register('car_model')} name="car_model" placeholder="Car Model" />
                </div>
                <div>
                    <label htmlFor="car_make">Car Make</label>
                    <Input {...register('car_make')} name="car_make" placeholder="Car Make" />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name="description" placeholder="Description" />
                </div>
                <div>
                    <label htmlFor="dimensions">Dimensions</label>
                    <Input {...register('dimensions')} name="dimensions" placeholder="Dimensions" />
                </div>
                <div>
                    <label htmlFor="max_speed">Max Speed</label>
                    <Input {...register('max_speed')} name="max_speed" placeholder="Max Speed" />
                </div>
                <div>
                    <label htmlFor="weight">Weight</label>
                    <Input {...register('weight')} name="weight" placeholder="Weight" />
                </div>
                <div>
                    <label htmlFor="cost_of_product">Cost Of Production</label>
                    <Input {...register('cost_of_product')} name="cost_of_product" placeholder="Cost Of Prod" />
                </div>
                <div>
                    <label htmlFor="series">Series</label>
                    <Input {...register('series')} name="series" placeholder="Series" />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}