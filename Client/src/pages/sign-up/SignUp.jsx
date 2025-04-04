import {useState} from 'react';
import {motion} from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Link, useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {wPost} from '../../utils/request.util.js';

const SignUp = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState(true);
  const [dob, setDob] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRepassword] = useState('');
  const [isMale, setIsMale] = useState(true);
  const navigate = useNavigate(); 

  const nowDate = new Date();

  const calculateAge = (date) => {
      if (!date) return 0;
      const ageDiff = nowDate - date;
      const ageDate = new Date(ageDiff); 
      return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const toggleGender = () => {
      setIsMale(!isMale);
      setGender(isMale ? true : false);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      const showToast = (message) => {
        const toastId = message;
        if (!toast.isActive(toastId)) {
            toast.error(message, {toastId});
        }
        return false;
      };  

      let hasError = false;

      if (!name) {
        showToast('Tên không được để trống.');
        hasError = true;
      } else if (name.length < 2 || name.length > 30) {
          showToast('Tên phải có từ 2 đến 30 ký tự.');
          hasError = true;
      }

      if (!dob) {
          showToast('Ngày sinh không được để trống.');
          hasError = true;
      } else if (calculateAge(dob) < 13) {
          showToast('Tuổi phải lớn hơn hoặc bằng 13.');
          hasError = true;
      }

      if (!email) {
          showToast('Email không được để trống.');
          hasError = true;
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
          showToast('Email không hợp lệ.');
          hasError = true;
      }

      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,18}$/;

      if (!password) {
          showToast('Mật khẩu không được để trống.');
          hasError = true;
      } else if (password.length < 6 || password.length > 18) {
          showToast('Mật khẩu phải có ít nhất 6 ký tự.');
          hasError = true;
      } else if (!passwordRegex.test(password)) {
          showToast('Mật khẩu phải có từ 6 kí tự đến 18 kí tự, bao gồm ít nhất một chữ in hoa, một số, và một ký tự đặc biệt.');
          hasError = true;
      }

      if (!rePassword) {
          showToast('Nhập lại mật khẩu không được để trống.');
          hasError = true;
      } else if (password !== rePassword) {
          showToast('Mật khẩu nhập lại không khớp.');
          hasError = true;
      }

      if (!hasError) {
          try {
            const response = await wPost('/api/register', {
              user: {
                lastName: name,
                gender: gender,
                dob: dob.toISOString().split('T')[0],
              },
              email: email,
              password: password,
              confirmPassword: rePassword,
            });

              if (response.ok) {
                  toast.success('Đăng ký tài khoản thành công!');
                  setName('');
                  setGender(true);
                  setDob(null);
                  setEmail('');
                  setPassword('');
                  setRepassword('');
                  return navigate('/sign-in');
              } else {
                  const errorData = await response.json();
                  showToast(errorData.message || 'Đăng ký tài khoản thất bại.');
              }
          } catch {
              showToast('Lỗi khi gửi yêu cầu.');
          }
      }
  };

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
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="w-full">
                        {/* Name */}
                        <motion.div
                            className="md:mb-4 mb-3 mt-6"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.9}}
                        >
                            {/* Name Label */}
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="name"
                            >
                                Tên
                            </label>
                            {/* Name Input */}
                            <input
                                type="text"
                                id="name"
                                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                                placeholder="Nhập tên của bạn"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </motion.div>
                        {/* Gender */}
                        <motion.div
                            className="md:mb-4 mb-3 mt-5"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.9}}
                        >
                            {/* Gender Input */}
                            <div className="flex items-center space-x-4">
                    <span
                        className={`text-sm font-semibold cursor-pointer ${isMale ? 'text-teal-500' : 'text-gray-400'}`}
                        onClick={() => setIsMale(true)}

                    >
                        Nam
                    </span>
                                <div
                                    className={`w-8 h-4 flex items-center rounded-full p-1 cursor-pointer ${isMale ? 'bg-teal-500' : 'bg-pink-400'}`}
                                    onClick={toggleGender}
                                >
                                    <div
                                        className={`bg-white w-2 h-2 rounded-full shadow-md transform duration-300 ease-in-out ${isMale ? 'translate-x-0' : 'translate-x-4'}`}
                                    />
                                </div>
                                <span
                                    className={`text-sm font-semibold cursor-pointer ${!isMale ? 'text-pink-400' : 'text-gray-400'}`}
                                    onClick={() => setIsMale(false)}
                                >
                        Nữ
                    </span>
                            </div>
                        </motion.div>
                        {/* Dob */}
                        <motion.div
                            className="md:mb-4 mb-3 mt-5"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.9}}
                        >
                            {/* Dob Label */}
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="name"
                            >
                                Ngày sinh
                            </label>
                            {/* Dob Input */}
                            <div className="flex flex-col w-full">
                                <DatePicker
                                    selected={dob}
                                    onChange={(date) => setDob(date)}
                                    className="block shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out mt-1"
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Chọn ngày sinh"
                                />
                            </div>
                        </motion.div>
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
                            className="md:mb-1 mb-0"
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
                        {/* RePassword */}
                        <motion.div
                            className="md:mb-6 mb-5"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 1}}
                        >
                            {/* RePassword Laybel */}
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="rePassword"
                            >
                                Nhập lại mật khẩu
                            </label>
                            {/* RePassword Input */}
                            <input
                                type="password"
                                id="rePassword"
                                className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                                placeholder="Nhập lại mật khẩu"
                                value={rePassword}
                                onChange={(e) => setRepassword(e.target.value)}
                                required
                            />
                        </motion.div>
                        {/* Checkbox Remember*/}
                        {/* Sign Up Button */}
                        <motion.div
                            className="md:mb-4 mb-3"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 1.2}}
                        >
                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-400 rounded-lg text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline transition duration-200"
                            >
                                Đăng ký
                            </button>
                        </motion.div>
                        {/* Exist Account */}
                        <motion.div
                            className="flex items-center justify-center"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 1.3}}
                        >
                            <p className="text-gray-500 text-sm">
                                Đã có tài khoản?{" "}
                                <Link
                                    to="/sign-in"
                                    className="text-green-500 hover:text-green-400"
                                >
                                    Đăng nhập
                                </Link>
                            </p>
                        </motion.div>
                    </form>
                    <ToastContainer/>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
