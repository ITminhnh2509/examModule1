import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  addchemical,
  deletechemical,
  editchemical,
  findchemical,
  editchemicalformula,
} from "../redux/ChemicallSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
export default function ChemialApp() {
  const dispatch = useDispatch();
  const chemicals = useSelector((state) => state.chemicals.chemicals);
  const [modal, setModal] = useState(false);
  const [textName, setTextName] = useState();
  const [textFormula, setTextFormula] = useState();
  const [isEdit, setIsEdit] = useState({ id: "", flag: false });
  const [isEdit2, setIsEdit2] = useState({ id: "", flag: false });
  const [textEdit, setTextEdit] = useState("");
  const [textEdit2, setTextEdit2] = useState("");
  const [textFind, setTextFind] = useState("");
  const toggle = () => setModal(!modal);
  const handle_add = (id) => {
    dispatch(addchemical(id));
    Swal.fire({
      title: "Add Chemical!",
      text: "You Chemical Add Sucess!",
      icon: "success",
    });
  };
  const handle_delete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your Chemical has been deleted.",
          icon: "success",
        });
        dispatch(deletechemical(id));
      }
    });
  };
  const handle_find = (id) => {
    dispatch(findchemical(id));
  };
  return (
    <>
      <Container className="box-container">
        <div className="d-flex py-1 px-2 my-3">
          <Button className="btn btn-warning mx-3" onClick={toggle}>
            Add new Chemical
          </Button>
          <Input
            className="inpt-find-chemical"
            value={textFind}
            onChange={(e) => setTextFind(e.target.value)}
            placeholder="Chemical want to find"
          />
          <Button
            className="btn btn-info mx-3"
            onClick={() => handle_find(textFind)}
          >
            Find
          </Button>
        </div>

        <Table className="table-chemical" hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Formula</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {chemicals.map((item, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  {!isEdit.flag && isEdit.id === item.id ? (
                    <input
                      value={textEdit}
                      onChange={(e) => setTextEdit(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(
                            editchemical({ id: item.id, name: textEdit })
                          );

                          setTextEdit("");
                          setIsEdit({ id: null, flag: true });
                        }
                      }}
                    />
                  ) : (
                    <p
                      onDoubleClick={() => {
                        setTextEdit(item.name);
                        setIsEdit({ id: item.id, flag: false });
                      }}
                    >
                      {item.name}
                    </p>
                  )}
                </td>
                <td>
                  {!isEdit2.flag && isEdit2.id === item.id ? (
                    <input
                      value={textEdit2}
                      onChange={(e) => setTextEdit2(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(
                            editchemicalformula({
                              id: item.id,
                              formula: textEdit2,
                            })
                          );

                          setTextEdit2("");
                          setIsEdit2({ id: null, flag: true });
                        }
                      }}
                    />
                  ) : (
                    <p
                      onDoubleClick={() => {
                        setTextEdit2(item.formula);
                        setIsEdit2({ id: item.id, flag: false });
                      }}
                    >
                      {item.formula}
                    </p>
                  )}
                </td>
                <td>
                  <Button
                    className="btn btn-danger"
                    onClick={() => handle_delete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add new Chemical</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup floating>
                <Input
                  value={textName}
                  required
                  onChange={(e) => setTextName(e.target.value)}
                />
                <Label for="exampleEmail">Name</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                <Input
                  required
                  value={textFormula}
                  onChange={(e) => setTextFormula(e.target.value)}
                />
                <Label for="examplePassword">Formula</Label>
              </FormGroup>{" "}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn btn-success"
              onClick={() => {
                handle_add({ name: textName, formula: textFormula });
                toggle();
              }}
            >
              Add
            </Button>
            <Button color="secondary" onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}
