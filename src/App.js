import React, {Component, Fragment} from 'react';
import Header from './Header';
import './App.css';
import api from './services/Api';

class App extends Component{
  constructor(){
    super();
    this.state = {
      apiKey: '29d87c53fcf6086e0655',
      de_moeda: "",
      para_moeda: "",
      valor: "",
      status: "",
    }
  }
converter = async(de_moeda, para_moeda) => {
  let de_para = `${de_moeda}_${para_moeda}`;
   const response = await api.get(`/convert?q=${de_para}&compact=ultra&apiKey=${this.state.apiKey}`);
   let moedaB = (parseFloat(this.state.valor) * response.data[de_para]).toFixed(2);
  
     this.setState({status: `${para_moeda}: ${moedaB}`});
}
  onChange = (e) => {
    const {name, value} = e.target;
   this.setState({[name]: value});
 }
 openConversor = () => {
  const {de_moeda, para_moeda, valor} = this.state;
  if(de_moeda === "" || para_moeda === "" || valor === "" ){
    this.setState({status: 'Preencha todos os campos'});
  }else if(de_moeda === para_moeda){
    this.setState({status: 'Os campos estão iguais'});
  }else{
    this.converter(de_moeda,para_moeda);
  }
 }
 render(){
  return (
    <Fragment>
    <Header/>
    <div className="App">
   <div class="form-group">
    <label htmlFor=""><b>De:</b></label>
    <select name="de_moeda" onChange={this.onChange} id="" className="form-control">
    <option value="0" selected  disabled>Escolha uma moeda</option>
    <option value="USD">U.S. Dollar</option>
    <option value="EUR">European euro</option>
    <option value="BRL">Brasil</option>
    <option value="GBP">Libra esterlina</option>
    </select>
    </div>
   <div class="form-group">
    <label htmlFor=""><b>Para:</b></label>
    <select  name="para_moeda" onChange={this.onChange} id="" className="form-control">
    <option value="0" selected  disabled>Escolha uma moeda</option>
    <option value="USD">U.S. Dollar</option>
    <option value="EUR">European euro</option>
    <option value="BRL">Brasil</option>
    <option value="GBP">Libra esterlina</option>
    </select>
    </div>
   <div class="form-group">
    <label htmlFor=""><b>Valor:</b></label>
    <input type="text" name="valor" onChange={this.onChange} value={this.state.valor} className="form-control"/>
    </div>
    <div class="form-group">
    <button type="button" className="btn btn-success" onClick={this.openConversor}>Consultar conversão</button>
    </div>
<div className="resultado ">
{ this.state.status }
</div>
    </div>
    </Fragment>

    );
}
}

export default App;
