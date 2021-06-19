import logo from './logo.svg';
import { useState, useEffect } from 'react';

import Header from "./components/Headerr/Header";
import Bucket from "./pages/bucket/Bucket";
import MainContent from "./components/mainContent/mainContent";
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const arrayBlock =[
    {
        id:'21',
        nameItem: 'Кроссовки',
        model:'Адидас',
        link: "https://static.ecco-shoes.ru/images/eshop/img/jpg/bigw/880223_52187.jpg?v=3",
        amount: 10

        
},
    {
        id:'22',
        nameItem: 'Кроссовки 1',
        model:'Адидас 1 ',
        link: "https://static.rendez-vous.ru/files/catalog_models/resize_640x630/1/1871436_krossovki_ash_addict_chernyy_zamsha_natural_naya.JPG",
        amount: 3
    },
    {
        id:'23',
        nameItem: 'Кроссовки 2',
        model:'Адидас 2',
        link: "https://static.rendez-vous.ru/files/catalog_models/2261179_krossovki_fila_disruptor_peachwhip_svetlo_rozovyy_kozha_natural_naya.JPG",
        amount: 0
    },
];

function App() {
    const [inputValueSearch, setValue] = useState('');

    const [items, setItems] = useState ([]);
    const [bucketItems, setBucketItems] = useState ([]);


    const addItemForBucket = (itemId) => {

        const itemForBucket = items.find(({ id }) => id === itemId);

        const isItemInBucket = bucketItems.find(({ id }) => id === itemId);

        if (isItemInBucket) {
            const itemForBucket = bucketItems.map((item)=> {
                if( item.id === itemId ){
                    return{
                        ...item,
                        amount: item.amount + 1
                    }
                }
                return item
            });
            setBucketItems(itemForBucket);
        } else {
            setBucketItems((prevState) => [...prevState, { ... itemForBucket, amount: 1 }])
        }


        // const filteredItems = items.map((item) =>{
        //     if( item.id === itemId ){
        //         return{
        //             ...item,
        //             amount: item.amount - 1
        //         }
        //     }
        //     return item
        
        // });

        // setItems(filteredItems);

        // addItemInBucket(itemId);
    }


    const onItemGoodClick = (itemId) => {
                
        setItems(itemForBucket)
       
        addItemForBucket(itemId);
    }


const deleteItemFromBucket = (itemId) =>{


    const filteredItemsforMainPage = items.map((item) =>{
        if( item.id===itemId ){
            return{
                ...item,
                amount: item.amount + 1
            }
        }
        return item
    });


    setItems(filteredItemsforMainPage);
    }
   
    

    const onItemsSearch = (e)=>{
        const {value} = e.target;
        setValue(value);

        const itemsAfterFilter = arrayBlock.filter(({nameItem})=>
            (nameItem.toLowerCase().includes(value.toLowerCase()))
        );

        setItems(itemsAfterFilter);

        console.log(itemsAfterFilter);
    }
    useEffect(()=> {
        setTimeout(()=> setItems(arrayBlock), 2000)

        }, [])
    console.log(items);


  return (

    <div className="App">

            <Router>
        <Header onChangeValueUser={onItemsSearch}
                inputValueSearch={inputValueSearch}/>

            <Switch>
          <Route exact path="/">  
          <MainContent arrayBlock={items}
          addItemToBucket={onItemGoodClick}
          />


        {
            items.length===0 && (

                <div>
                    <div className="lds-heart">
                        <div>


                        </div>
                    </div>
                </div>
            )

        }
    </Route>
    <Route path="/bucket">
        
        <Bucket 
            bucketItems={bucketItems}
            deleteItemFromBucket ={deleteItemFromBucket}
         />
    </Route>
</Switch> 
</Router>
          
      
    </div>
  );
}

export default App;
