import {useState} from 'react';
import {motion} from 'framer-motion';
import {Link, useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {signIn} from '../../utils/auth.util.js';
import {saveToken} from '../../utils/token.util.js';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    let hasError = false;

    const showToast = (message) => {
      const toastId = message;
      if (!toast.isActive(toastId)) {
          toast.error(message, {toastId});
      }
      return false;
    };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      showToast('Email không được để trống.');
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setError('Email không hợp lệ.');
      hasError = true;
    }

    if (!password.trim()) {
      showToast('Mật khẩu không được để trống.');
      hasError = true;
    } else if (password.length < 6 || password.length > 18) {
      showToast('Mật khẩu phải từ 6 kí tự đến 18 kí tự.');
      return true;}
    if (import.meta.env.DEV) {
      console.log('Signing in with email:', email);
    }

    if (!hasError) {
      const data = await (await signIn(email, password)).json();
        //save token
        if (import.meta.env.DEV) {
          console.log('data =', data);
        }
        const token = data.detail;
        saveToken(token);
        if (import.meta.env.DEV) {
          console.log('token =', token);
        }
        if (token) {
          toast.success('Đăng nhập tài khoản thành công!');
          navigate('/');
        } else {
          showToast('Email hoặc mật khẩu không chính xác.');
        }

    }

  }

  return (
      <div
          className="flex md:justify-end justify-center items-center"
          style={{
            background: `url('/thumbnail1.png')`, // Hình nền gốc
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '100vh', // Giữ nguyên chiều cao 1 màn hình
          }}
      >
        {/* Lớp mờ ảo */}
        <div
            className="absolute inset-0"
            style={{
              backdropFilter: 'blur(8px)', // Độ mờ ảo (có thể điều chỉnh giá trị)
              backgroundColor: 'rgba(0, 0, 0, 0.3)', // Lớp phủ tối nhẹ để tăng độ tương phản
            }}
        ></div>
        <div>
          {/* Sport Center */}
          <motion.div
              className="absolute top-3 left-0 transform -translate-y-1/2 px-4 lg:block hidden"
              style={{width: '40%'}}
              initial={{x: '-50%'}}
              animate={{x: '35%'}}
              transition={{duration: 1.4, ease: 'easeInOut'}}
          >
            <h1
                className="text-white shadow-lg"
                style={{
                  fontFamily: 'Air Americana',
                  fontStyle: 'italic',
                  fontSize: '170px',
                  margin: '0',
                  lineHeight: '1.1',
                }}
            >
              TUAN ANH
            </h1>
            <h1
                className="text-white shadow-lg"
                style={{
                  fontFamily: 'Air Americana',
                  fontStyle: 'italic',
                  fontSize: '140px',
                  margin: '0',
                  lineHeight: '1.1',
                }}
            >
              SPORT
            </h1>
          </motion.div>
        </div>
        <div
            className="bg-white relative rounded-xl shadow-xl border-2 border-r-gray-700 w-full md:max-w-md max-w-sm py-10 md:px-8 px-6 md:mr-32 md:mx-0 mx-4">
          <div className="flex flex-col">
            {/* Logo */}
            <Link to={"/"} className={"flex justify-center items-center gap-4"}>
              <motion.img
                  src="/LogoT&H.png"
                  alt="Logo"
                  className="md:w-16 md:h-16 w-14 h-14"
                  initial={{opacity: 0, y: -20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.5}}
              />
              {/* Title */}
              <motion.h1
                  className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 via-green-500 to-yellow-200 text-transparent bg-clip-text drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 tracking-wide"
                  initial={{opacity: 0, y: -20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.6}}
              >
                Booking FIELD
              </motion.h1>
            </Link>
            {/* Description */}
            <motion.p
                className="text-gray-500 mb-6 flex justify-center items-center"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.7}}
            >
              Welcome to Sport Center! Please Login
            </motion.p>
            {/* Log Error */}
            {error && (
                <motion.p
                    className="text-red-500 text-sm mb-4"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.5}}
                >
                {error}
                </motion.p>
            )}
            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full">
              {/* Email */}
              <motion.div
                  className="md:mb-4 mb-3"
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.9}}
              >
                {/* Email Label */}
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                >
                  Email
                </label>
                {/* Email Input */}
                <input
                    type="email"
                    id="email"
                    className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
              </motion.div>
              {/* Password */}
              <motion.div
                  className="md:mb-6 mb-5"
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 1}}
              >
                {/* Password Laybel */}
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                >
                  Mật khẩu
                </label>
                {/* Password Input */}
                <input
                    type="password"
                    id="password"
                    className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
              </motion.div>
              {/* Checkbox Remember and Forgot Password*/}
              <motion.div
                  className="flex items-center justify-between md:mb-4 mb-3"
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 1.1}}
              >
                <div className="flex items-center">
                  <input
                      type="checkbox"
                      id="remember-me"
                      className="mr-2 leading-tight"
                  />
                  <label htmlFor="remember-me" className="text-gray-700 text-sm">
                    Nhớ mật khẩu
                  </label>
                </div>
                <a
                    href="/forgot-password"
                    className="inline-block align-baseline md:font-medium font-medium md:text-sm text-green-500 hover:text-green-600 transition duration-200"
                >
                  Quên mật khẩu?
                </a>
              </motion.div>
              {/* Sign In Button */}
              <motion.div
                  className="md:mb-4 mb-3"
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 1.2}}
              >
                <button
                    type="submit"
                    className="w-full rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline transition duration-200"
                >
                  Đăng nhập
                </button>
              </motion.div>
              {/* No Account */}
              <motion.div
                  className="flex md:mb-6 mb-5 items-center justify-center"
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 1.3}}
              >
                <p className="text-gray-500 text-sm">
                  Nếu chưa có tài khoản?{' '}
                  <Link
                      to="/sign-up"
                      className="text-green-500 hover:text-green-400"
                  >
                    Đăng ký
                  </Link>
                </p>
              </motion.div>
            </form>
            <ToastContainer/>
          </div>
        </div>
      </div>);
};

export default SignIn;