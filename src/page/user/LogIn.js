import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, FormLabel } from "react-bootstrap";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignupModal from "./SignUpModal";

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [categories, setCategories] = useState([]);
    const [showSignup, setShowSignup] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:9999/categories").then((res) => {
          setCategories(res.data);
        });
      }, []);
      const [users, setUsers] = useState([]);
      useEffect(()=>{
        axios.get("http://localhost:9999/users").then((res)=>{
            setUsers(res.data);
        });
      },[]);
      const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        let check= false;
        for(let u of users){
            if(email===u.email&&password===u.password){
                console.log('Đăng nhập thành công');
                sessionStorage.setItem('account',JSON.stringify(u));
                console.log(JSON.stringify(u));
                alert("Đăng nhập thành công!");
                check=true;
                navigate('/');
                break;
            }
        }
        if(!check){
            alert('Sai email hoặc mật khẩu');
            
        }
    }
    return(
        <div>
            <Header categories={categories}></Header>
            <Container style={{marginBlock: "100px", paddingInline: "300px"}}>
            <h1>Đăng nhập</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                <Form.Label>Email: </Form.Label>
                <Form.Control value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required></Form.Control>
                </Form.Group>
                <Form.Group>
                <Form.Label>Password: </Form.Label>
                <Form.Control value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required></Form.Control>
                </Form.Group>
                <Form.Group className="mt-3">
                    <Button type="submit" className="btn btn-dark">Đăng nhập</Button>
                </Form.Group>
            </Form>
            <span class="text-muted">Chưa có tài khoản?</span><a href="#" onClick={() => setShowSignup(true)}>Đăng kí</a><br/>
            <span class="text-muted">Bạn đã quên mật khẩu?</span><a href="">Quên mật khẩu</a>
            </Container>
            <Footer></Footer>
            <SignupModal show={showSignup} handleClose={() => setShowSignup(false)} />
        </div>
    );
}
export default LogIn