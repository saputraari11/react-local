import React from 'react'

class card extends React.Component{
    
    render(){
        const buku = this.props.buku
        return(
            <div className="col-lg-6 col-sm-12 p-2">
                <div className="card">
                    <div className="card-body row">
                        <div className="col-5">
                            <img src={buku.cover} alt="error" height="200"/>
                        </div>
                        <div className="col-7">
                            <h5 className="text-info">
                                {buku.judul}
                            </h5>
                            <h6 className="text-dark">
                                {buku.penulis}
                            </h6>
                            <h6 className="text-dark">
                                {buku.penerbit}
                            </h6>
                            <h6 className="text-danger">
                                {buku.harga}
                            </h6>
                            <button className="btn btn-sm btn-primary m-1" onClick={this.props.onEdit}>Edit</button>
                            <button className="btn btn-sm btn-danger m-1" onClick={this.props.onDrop}>Drop</button>
                            <button className="btn btn-sm btn-success m-1" onClick={this.props.onAdd}>Tambah Keranjang</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default card