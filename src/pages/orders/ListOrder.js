import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAll} from "../../redux/services/OrderService";
import {Link} from "react-router-dom";

function ListOrder() {
    const dispatch = useDispatch();
    const orders = useSelector(({orders}) => {
        return orders.list;
    });

    useEffect(() => {
        dispatch(getAll())
    }, [dispatch]);

    return (
        <>
            <h1>Thống kê đơn hàng</h1>
            <div className="row mb-4">
                <form className="d-flex col-12" role="search">
                    <div className="col-2">
                        <span>Danh sách từ</span>
                        <input
                            className="form-control me-2"
                            type="date"
                            placeholder="Search"
                            aria-label="Search"
                        />
                    </div>
                    <div className="col-2">
                        <span>đến</span>
                        <input
                            className="form-control me-2"
                            type="date"
                            placeholder="Search"
                            aria-label="Search"
                        />
                    </div>
                    <button className="btn btn-outline-danger" type="submit">
                        Xem
                    </button>
                </form>
            </div>
            <table className="table table-hover table-bordered" style={{textAlign: "center"}}>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã đơn hàng</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá(USD)</th>
                    <th>Loại sản phẩm</th>
                    <th>Ngày mua</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th>
                    <th>Sửa</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders.length > 0 ? orders.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.product ? item.product.name : 'Không có tên'}</td>
                            <td>{item.product ? item.product.price : 'N/A'}</td>
                            <td>{item.product ? item.product.category : 'N/A'}</td>
                            <td>{item.purchaseDate}</td>
                            <td>{item.quantity}</td>
                            <td>{item.quantity * (item.product ? item.product.price : 0)}</td>
                            <td>
                                <button>Sửa</button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="9">Không có dữ liệu</td>
                        </tr>
                    )
                }
                </tbody>
                <tr>
                    <td colSpan={8}></td>
                    <td>
                        <Link to={"/orders/add"}>
                            <button className="btn btn-outline-info mb-2">Thêm đơn hàng</button>
                        </Link>
                    </td>
                </tr>
            </table>
        </>
    )
}

export default ListOrder;