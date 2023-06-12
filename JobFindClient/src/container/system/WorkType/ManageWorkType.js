import React from 'react'
import { useEffect, useState } from 'react';
import { DeleteAllcodeService, getListAllCodeService } from '../../../service/userService';
import moment from 'moment';
import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageWorkType = () => {
    const [dataWorkType, setdataWorkType] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')

    useEffect(() => {
        try {
            let fetchData = async () => {
                let arrData = await getListAllCodeService({

                    type: 'WORKTYPE',
                    limit: PAGINATION.pagerow,
                    offset: 0

                })
                if (arrData && arrData.errCode === 0) {
                    setdataWorkType(arrData.data)
                    setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
                }
            }
            fetchData();
        } catch (error) {
            console.log(error)
        }

    }, [])
    let handleDeleteWorkType = async (event, id) => {
        event.preventDefault();
        let res = await DeleteAllcodeService(id)
        if (res && res.errCode === 0) {
            toast.success("Xóa hình thức làm việc thành công")
            let arrData = await getListAllCodeService({

                type: 'WORKTYPE',
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow

            })
            if (arrData && arrData.errCode === 0) {
                setdataWorkType(arrData.data)
                setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
            }

        } else toast.error("Xóa hình thức làm việc thất bại")
    }
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getListAllCodeService({

            type: 'WORKTYPE',
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow

        })
        if (arrData && arrData.errCode === 0) {
            setdataWorkType(arrData.data)

        }
    }

    return (
        <div>
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Danh sách hình thức làm việc</h4>

                        <div className="table-responsive pt-2">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>
                                            STT
                                        </th>
                                        <th>
                                            Tên hình thức làm việc
                                        </th>
                                        <th>
                                            Mã code
                                        </th>

                                        <th>
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataWorkType && dataWorkType.length > 0 &&
                                        dataWorkType.map((item, index) => {

                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.value}</td>
                                                    <td>{item.code}</td>
                                                    <td>
                                                        <Link style={{ color: '#4B49AC' }} to={`/admin/edit-work-type/${item.id}/`}>Edit</Link>
                                                        &nbsp; &nbsp;
                                                        <a style={{ color: '#4B49AC' }} href="#" onClick={(event) => handleDeleteWorkType(event, item.id)} >Delete</a>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <ReactPaginate
                        previousLabel={'Quay lại'}
                        nextLabel={'Tiếp'}
                        breakLabel={'...'}
                        pageCount={count}
                        marginPagesDisplayed={3}
                        containerClassName={"pagination justify-content-center pb-3"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        activeClassName={"active"}
                        onPageChange={handleChangePage}
                    />
                </div>

            </div>

        </div>
    )
}

export default ManageWorkType
