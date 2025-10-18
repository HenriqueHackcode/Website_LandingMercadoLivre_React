import React from 'react';
import { useEffect, useState } from 'react';
import Produto from '../components/Produto';
import axios from 'axios';

const Home = () => {
  const [produtos, setprodutos] = useState([]);

  useEffect(() => {
    const requisicaoAxios = async () => {
      const { data } = await axios.get('/produto');
      setprodutos(data);
    };
    requisicaoAxios();
  }, []);

  if (produtos.length === 0) return <></>;
  return (
    <section className="secao-produto">
      <div className="container">
        <h1 className="container__title">Todos os produtos</h1>
        <div className="produtos">
          {produtos.map((produto) => (
            <Produto {...produto} key={produto.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
