import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAll} from "../../redux/services/ProductService";
import {add} from "../../redux/services/OrderService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import {format} from "date-fns";

const today = new Date();
const orderSchema = Yup.object().shape({
    purchaseDate: Yup.date()
        .min(today, 'Ngày chọn phải lớn hơn ngày hiện tại')
        .required('Không để trông')
    ,
    quantity: Yup.number()
        .min(1, 'Số lượng phải là số nguyên lớn hơn không')
        .required('Không để trông')
    ,
    productId: Yup.string()
        .required('Không để trông')
})

function AddOrder() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(({products}) => {
        return products.list;
    })
    useEffect(() => {
        dispatch(getAll()).catch(error => {
            console.error("Failed to fetch categories:", error);
        });
    }, [dispatch]);

    const addOrder = (values) => {
        const formattedPurchaseDate = format(new Date(values.purchaseDate), 'dd/MM/yyyy');

        const orderData = { ...values, purchaseDate: formattedPurchaseDate };

        Swal.fire({
            title: `Bạn chắc chắn muốn thêm sản phẩm?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Chắc chắn',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(add(orderData)).then(() => {
                    navigate('/orders/home');
                })
            } else {
                Swal.fire('Hủy thêm thành công', '', 'info');
            }
        });
    }
    return (
        <>
            <div className='container '>
                <h1>Create</h1>
                <Formik
                    initialValues={{
                        purchaseDate: '',
                        quantity: '',
                        productId: ''
                    }} onSubmit={addOrder}
                    validationSchema={orderSchema}
                >
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Ngày mua</label>
                            <Field id='date' className='form-control' name={"purchaseDate"} placeholder={"Ngày mua"} type={'date'}/>
                            <span style={{color: 'red'}}><ErrorMessage name={'purchaseDate'}/></span><br/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Số lượng</label>
                            <Field id='quantity' className='form-control' name={"quantity"} placeholder={"Số lượng"} type={'number'}/>
                            <span style={{color: 'red'}}><ErrorMessage name={'quantity'}/></span><br/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="product" className="form-label">Sản phẩm</label>
                            <Field id='product' className ='form-control' name={"productId"} as={"select"}>
                                <option value={""} label={"Chọn sản phẩm"}/>
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>
                                        {product.name}
                                    </option>
                                ))}
                            </Field>
                        </div>
                        <div>
                            <span style={{color: 'red'}}><ErrorMessage name={'productId'}/></span><br/>
                            <button className='btn btn-success' type={"submit"}>Thêm</button>
                        </div>
                        <Link to={"/orders/home"}>
                            <button className="btn btn-outline-info mb-2">Trở lại</button>
                        </Link>
                    </Form>
                </Formik>

            </div>


        </>
    )
}

export default AddOrder;