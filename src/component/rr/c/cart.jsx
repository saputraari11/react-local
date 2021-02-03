import React from 'react'
import $ from "jquery"
class cart extends React.Component{
    constructor(){
        super()
        this.state = {cart:[],total:0,username:'',index:[],active:false,one:false}
    }
    init=()=>{
        let temp = []
        if(localStorage.getItem("cart")!== null){
            let simpan = JSON.parse(localStorage.getItem("cart"))
            simpan.forEach(element => {
               temp.push(element)
            });
        }
        let name = sessionStorage.getItem("user")
       
        this.setState(i=>({
            cart:temp,username:name
        }))
    }
    componentDidMount(){
        this.init()
        
    }
    Handle = (ev,i)=>{
        const {name,value,type}=ev.target
        let temp = this.state.cart
        let total = 0
        let kondisi = []
        
        if(name!=="close" && name!=="drop" && name!=="all" && name!=="del"){
            if(name==="manual"){
                temp[i].jumlah = value
               
            }
            else{
                if(name==="kurang"){
                        temp[i].jumlah--
                }
                else if(name==="tambah")
                {
                    temp[i].jumlah++

                }
               
            }
            if(temp[i].jumlah===0){
                $("#ph").show()
                this.setState({index:i})
            }
          
            localStorage.setItem("cart",JSON.stringify(temp))
                for(let m=0;m<document.getElementsByClassName("one").length;m++){
                if(document.getElementsByClassName("one")[m].checked){
                    kondisi.push(true)
                }
                else{
                    kondisi.push(false)
                }
            }
            let cv = 0
            kondisi.map((e,x)=>{
                if(e){
                    total+=(temp[x].jumlah*temp[x].harga);
                    cv++
                }
            })
            if(cv===document.getElementsByClassName("one").length){
                this.setState({active:true})
            }
            else if(cv!==document.getElementsByClassName("one").length){
                this.setState({active:false})
            }
           
           
            this.setState({cart:temp,total:total})
            
        }
        else{
            if(type==="checkbox"){
                
                if(name==="all"){
                    for(let m=0;m<document.getElementsByClassName("one").length;m++){
                        if(document.getElementsByClassName("one")[m].checked){
                            kondisi.push(true)
                        }
                        else{
                            kondisi.push(false)
                        }
                    }
                    let cv = 0
                    kondisi.map((e,x)=>{
                        if(e){
                           return total+=(temp[x].jumlah*temp[x].harga)&&cv++

                        }
                    })
                    if(cv===0){
                        kondisi.map((e,x)=>{
                            return total+=(temp[x].jumlah*temp[x].harga);
                        })
                        this.setState(x=>({active:!x.active,total:total}))
                        $(".one").prop("checked",true)
                       
                    }
                    else{
                        this.setState(x=>({active:!x.active,total:0}))
                        $(".one").prop("checked",false)
                    }
                   
                    


                }
                

            }
            else if(name==="del"){
                localStorage.removeItem("cart")
                this.setState({cart:[],total:0,active:false})
            }
            else{
                if(name==="close"){
                    if(document.getElementsByClassName("one")[i].checked){
                        temp[i].jumlah++
                        temp.map(e=>{
                            return total+=(e.jumlah*e.harga);
                        })
                        this.setState({total:total})
                    }
                    else{
                        temp[i].jumlah++
                    }
                    localStorage.setItem("cart",JSON.stringify(temp))
                    this.setState({cart:temp})
                    $("#ph").hide()

                }
                else if(name==="drop"){
                    
                    if(document.getElementsByClassName("one")[i].checked){
                        temp.map(e=>{
                            return total+=(e.jumlah*e.harga);
                        })
                        this.setState({total:total})
                    }
                    temp.splice(i,1)
                   
                    localStorage.setItem("cart",JSON.stringify(temp))
                    this.setState({cart:temp})
                    $("#ph").hide()

                }
               
            }
            
           
        }
        
    }
    
    render(){
        return(
            <div>
                <div className="modal" id="ph"tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                    
                    <div class="modal-body">
                        <p>Anda yakin hapus item ini?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" name="close" onClick={ev=>this.Handle(ev,this.state.index)}>Close</button>
                        <button type="button" className="btn btn-primary" name="drop" onClick={ev=>this.Handle(ev,this.state.index)}>Save changes</button>
                    </div>
                    </div>
                </div>
                </div>

                <div className="card col-12 mt-2">
                    <div className="card-header bg-primary text-white">
                        <h4>
                            Data Keranjang Belanja
                        </h4>
                    </div>
                    <div className="card-body">
                        <div className="row my-1 ml-2">
                        <div className="col-6">  
                        <h5 className="text-primary">
                            Name User : {this.state.username}
                        </h5>
                        </div>
                        <div className="col-6 del" hidden={!this.state.active}>
                            <button className="btn btn-danger text-light my-2" name="del" onClick={ev=>this.Handle(ev,document.getElementsByClassName("one").length)}>delete</button>
                        </div>
                        </div>
                        <div className="row">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th style={{width:"10%",border:"0"}}>
                                    <input class="form-check-input ml-1" type="checkbox"  name="all" id="all" checked={this.state.active} onClick={ev=>this.Handle(ev,document.getElementsByClassName('one').length)} /><label htmlFor="all" className="ml-4" >Semua</label></th>
                                    <th>
                                        Nama Item
                                    </th>
                                    
                                    <th>
                                        Harga
                                    </th>
                                    <th>
                                        Qty
                                    </th>
                                    <th>
                                        Total
                                    </th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.cart.map((item,index)=>
                                <tr key={index}>
                                <td><input class="form-check-input one" type="checkbox" style={{marginTop:"1%",marginLeft:"3%"}}onClick={ev=>this.Handle(ev,index)}/></td>
                                <td>{item.judul}</td>
                                <td>{item.harga}</td>
                                <td><button className="btn btn-success mx-2 w-auto h-auto"name="kurang" onClick={ev=>this.Handle(ev,index)}>-</button><input className="form-control form-control-sm w-25 d-inline"  type="number" name = "manual" value={item.jumlah} onChange={ev=>this.Handle(ev,index)}/><button className="btn btn-success mx-2" name="tambah" onClick={ev=>this.Handle(ev,index)}>+</button></td>
                                <td>{(item.jumlah*item.harga)}</td>
                                </tr>
                            )}
                            </tbody>
                            <h4 className="text-danger mt-2">
                                Total Harga : Rp.{this.state.total}
                            </h4>
                        </table>
                        </div>
                      
                    </div>
                </div>
            </div>
        )
    }
}
export default cart
