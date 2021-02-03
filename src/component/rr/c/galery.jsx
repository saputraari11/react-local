import React from 'react'
import Card from './card'
import $ from 'jquery'
class galery extends React.Component{
    constructor(){
        super()
        this.state={buku:[
            {
            isbn:"12345",judul:"Bulan",penulis:"Tere Liye",penerbit:"CV Harapan Kita",harga:90000,cover:"https://drive.google.com/uc?id=1ui-jyKgu3DqFyo7VKJu-FFXkaNQN3aSg"
        },
        {
            isbn:"12346",judul:"Anak Badai",penulis:"Tere Liye",penerbit:"CV Harapan Kita",harga:80000,cover:"https://drive.google.com/uc?id=1rJDcCOmsd14NL6DG3Wps_kewZomGcLU-"
        },
        {
            isbn:"54321",judul:"Bumi",penulis:"Tere Liye",penerbit:"CV Harapan Kita",harga:70000,cover:"https://drive.google.com/uc?id=1e-thvq7lkG1_gw0FqHzRoiAhfhdgpOUj"
        }
    ],action:'',isbn:'',judul:'',penulis:'',penerbit:'',harga:0,cover:'',selectItem:null,keyword:"",filter:"",user:''
}
this.state.filter = this.state.buku
    }
    search=(ev)=>{
            let keyword = this.state.keyword.toLowerCase()
            let temp=this.state.buku
            let result = temp.filter(item=>{
           return item.judul.toLowerCase().startsWith(keyword)|| item.penerbit.toLowerCase().startsWith(keyword)|| item.penulis.toLowerCase().startsWith(keyword)
                  })
            this.setState({filter:result})
    }
    render(){
        return(
        <div className="container">
            <h4 className="text-info my-2">
                <b>NAMA ANDA:</b> {this.state.user}
            </h4>
            <input type="text" className="form-control my-2" placeholder="Pencarian" value={this.state.keyword} onChange={ev=>this.setState({keyword:ev.target.value})} onKeyUp={ev=>this.search(ev)}/>
            {this.state.filter.map((item,index)=><Card
            buku={item}
            onEdit={()=>this.edit(index)}
            onDrop={()=>this.drop(index)}
            onAdd = {()=>this.TK(item)}
            />)}
            <button className="btn btn-success m-1" onClick={()=>this.add()}>Tambah</button>
            <div className="modal" id="modal-buku">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                    Form Buku
                        </div>
                        <div className="modal-body">
                            <form action="" onSubmit={ev=>this.save(ev)}>
                            judul buku
                            <input type="text" className="form-control mb-2" value={this.state.judul} onChange={ev=>this.setState({judul:ev.target.value})}/>    
                            penulis buku
                            <input type="text" className="form-control mb-2" value={this.state.penulis} onChange={ev=>this.setState({penulis:ev.target.value})}/>    
                            penerbit buku
                            <input type="text" className="form-control mb-2" value={this.state.penerbit} onChange={ev=>this.setState({penerbit:ev.target.value})}/>    
                            harga buku
                            <input type="number" className="form-control mb-2" value={this.state.harga} onChange={ev=>this.setState({harga:ev.target.value})}/>    
                            cover buku
                            <input type="url" className="form-control mb-2" value={this.state.cover} onChange={ev=>this.setState({cover:ev.target.value})}/>    
                           
                           <button className="btn btn-info btn-block" type="submit">simpan</button>
                            </form>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    
    componentDidMount(){
        this.setUser()
    }
    save=(ev)=>{
        ev.preventDefault();
        const temp = this.state.buku
        if(this.state.action==="insert"){
            temp.push({isbn:Math.random(1,1000000),judul:this.state.judul,penulis:this.state.penulis,penerbit:this.state.penerbit,harga:this.state.harga,cover:this.state.cover})
        }
       else if(this.state.action==="update"){
           let i = this.state.selectItem
           temp[i].isbn=this.state.isbn
           temp[i].judul=this.state.judul
           temp[i].penulis=this.state.penulis
           temp[i].penerbit=this.state.penerbit
           temp[i].harga=this.state.harga
           temp[i].cover=this.state.cover
       }
       this.setState({buku:temp})
       $("#modal-buku").hide()
    }
    edit=(index)=>{
        $("#modal-buku").show()
        let buku = this.state.buku[index]
        this.setState({
            isbn:buku.isbn,
            judul:buku.judul,
            penulis:buku.penulis,
            penerbit:buku.penerbit,
            harga:buku.harga,
            cover:buku.cover,
            action:"update",
            selectItem:index
        })
    }
    drop=(index)=>{
        let temp = this.state.buku
        temp.splice(index,1)
        this.setState({buku:temp})
    }
    add=()=>{
        $("#modal-buku").show()
        this.setState({
            judul:'',
            penulis:'',
            penerbit:'',
            harga:'',
            cover:'',
            action:"insert"
         })
    }
   setUser = ()=>{
       if(sessionStorage.getItem("user")===null){
        let prompt = window.prompt("masukan nama anda: ",'').trim()
        if(prompt === null||prompt===''){
            this.setUser()
        }
        else{
            sessionStorage.setItem("user",prompt)
            this.setState({user:prompt})
        }
       }
       else{
        let user = sessionStorage.getItem("user")
        this.setState({user:user})
       }
   }
   TK = (selectItem)=>{
    let temp = []
    if(localStorage.getItem("cart")!==null){
        temp = JSON.parse(localStorage.getItem("cart"))
    }
    let existItem = temp.find(item=>item.isbn === selectItem.isbn)
    if(existItem){
        window.alert("u have chosen this item!")
    }
    else{
        let jumlah = window.prompt("Masukan Jumlah Barang : "," ").trim()
     
        if(jumlah===null||jumlah===''){
            this.TK()
        }
        else{
            selectItem.jumlah = jumlah
            temp.push(selectItem)
            localStorage.setItem("cart",JSON.stringify(temp))
        }
    }
   }
}
export default galery