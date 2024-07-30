import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAll} from "../../redux/services/OrderService";
import Swal from "sweetalert2";

function SearchOrder() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const query = new URLSearchParams(location.search);
    const startDate = query.get('startDate');
    const endDate = query.get('endDate');
    const orders = useSelector(({ orders }) => orders.list);
    const [listSearch, setListSearch] = useState([]);

    useEffect(() => {
        dispatch(getAll()).catch((error) => {
            console.error("Failed to fetch categories:", error);
        });
    }, [dispatch]);

    useEffect(() => {
        const orderList = orders.filter((item) => {
            const purchaseDate = new Date(item.purchaseDate);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return (!startDate || purchaseDate >= start) && (!endDate || purchaseDate <= end);
        });
        if (orderList.length === 0) {
            Swal.fire({
                title: 'Không có kết quả',
                text: 'Không tìm thấy đơn hàng nào trong khoảng thời gian đã chọn.',
                icon: 'info',
                confirmButtonText: 'OK'
            });
            navigate('/orders/home');
        }

        setListSearch(orderList);
    }, [orders, startDate,endDate]);

    return (
        <>
            <Link to={"/orders/home"}>
                <button className="btn btn-outline-info mb-2">Trở lại</button>
            </Link>
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
                    listSearch.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.product.name}</td>
                            <td>{item.product.price}</td>
                            <td>{item.product.category}</td>
                            <td>{item.purchaseDate}</td>
                            <td>{item.quantity}</td>
                            <td>{item.quantity * item.product.price}</td>
                            <td>
                                <button>Sửa</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    );
}

export default SearchOrder;