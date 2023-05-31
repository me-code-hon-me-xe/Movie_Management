
import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../../context/UserContext';
import axios from 'axios';

import './style.scss';
import Staff from '../../../components/Staff';
import Popup from '../../../components/Popup'
import AddStaffBtn from '../../../components/AddStaffBtn';
export default function () {
    const [currentStaff, setCurrentStaff] = useState(null);
    const [staffs, setStaffs] = useState([])
    const { jwtToken } = useContext(UserContext)
    useEffect(() => {
        fetchStaffs();
    }, [])

    const fetchStaffs = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        };
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/staffs`, config);
        if (response.data.success) {
            setStaffs(response.data.data)
        }
    }


    const [showPopup, setShowPopup] = useState(false);
    // const staffs = [
    //     {
    //         staffImage: "https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    //         staffName: "Dat Dang",
    //         staffTitle: "Staff",
    //         staffBio: "Dat is a dedicated and hardworking member of our team, with a passion for customer service and problem-solving. He is always eager to lend a hand and goes above and beyond to ensure that every customer has a positive experience. In his free time, Dat enjoys hiking and exploring new places.     Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident excepturi aliquid, id explicabo laboriosam ea iusto fuga vero vitae qui non, expedita facilis. Nam sunt voluptate vitae, dignissimos velit tempore eius quam tempora quis consequuntur deserunt saepe ut laboriosam vel commodi error totam maiores dicta voluptates recusandae voluptatem soluta cum laudantium odit! Dolores, exercitationem. Veritatis nesciunt ipsam iure dignissimos porro commodi incidunt eius odio architecto eveniet suscipit voluptate distinctio accusantium, fugit facilis minus corrupti, quia quod nihil optio, in sunt a! Cupiditate odio, velit modi at quo facilis eum nam? Vel velit eius aliquid neque sequi laudantium enim fugiat obcaecati? ",
    //         joinedDate: "15/04/2023",
    //         staffEmail: "as2@gmail.com",
    //         staffPhoneNumber: "02195125126"
    //     },
    //     {
    //         staffImage: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    //         staffName: "John Doe",
    //         staffTitle: "Staff",
    //         staffBio: "Dat is a dedicated and hardworking member of our team, with a passion for customer service and problem-solving. He is always eager to lend a hand and goes above and beyond to ensure that every customer has a positive experience. In his free time, Dat enjoys hiking and exploring new places.",
    //         joinedDate: "12/05/2023",
    //         staffEmail: "johndoe@gmail.com",
    //         staffPhoneNumber: "02195678563"
    //     },
    //     {
    //         staffImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    //         staffName: "Jane Doe",
    //         staffTitle: "Staff",
    //         staffBio: "Dat is a dedicated and hardworking member of our team, with a passion for customer service and problem-solving. He is always eager to lend a hand and goes above and beyond to ensure that every customer has a positive experience. In his free time, Dat enjoys hiking and exploring new places.",
    //         joinedDate: "02/06/2023",
    //         staffEmail: "janedoe@gmail.com",
    //         staffPhoneNumber: "02195987654"
    //     },
    //     {
    //         staffImage: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    //         staffName: "Bob Smith",
    //         staffTitle: "Staff",
    //         staffBio: "Dat is a dedicated and hardworking member of our team, with a passion for customer service and problem-solving. He is always eager to lend a hand and goes above and beyond to ensure that every customer has a positive experience. In his free time, Dat enjoys hiking and exploring new places.",
    //         joinedDate: "24/06/2023",
    //         staffEmail: "bobsmith@gmail.com",
    //         staffPhoneNumber: "02195432156"
    //     },
    //     {
    //         staffImage: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    //         staffName: "Emily Jones",
    //         staffTitle: "Staff",
    //         staffBio: "Dat is a dedicated and hardworking member of our team, with a passion for customer service and problem-solving. He is always eager to lend a hand and goes above and beyond to ensure that every customer has a positive experience. In his free time, Dat enjoys hiking and exploring new places.",
    //         joinedDate: "06/07/2023",
    //         staffEmail: "emilyjones@gmail.com",
    //         staffPhoneNumber: "02195876543"
    //     },
    //     {
    //         staffImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    //         staffName: "David Lee",
    //         staffTitle: "Staff",
    //         staffBio: "Dat is a dedicated and hardworking member of our team, with a passion for customer service and problem-solving. He is always eager to lend a hand and goes above and beyond to ensure that every customer has a positive experience. In his free time, Dat enjoys hiking and exploring new places.",
    //         joinedDate: "16/07/2023",
    //         staffEmail: "davidlee@gmail.com",
    //         staffPhoneNumber: "02195765432"
    //     },
    //     {
    //         staffImage: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    //         staffName: "Sarah Brown",
    //         staffTitle: "Staff",
    //         staffBio: "Dat is a dedicated and hardworking member of our team, with a passion for customer service and problem-solving. He is always eager to lend a hand and goes above and beyond to ensure that every customer has a positive experience. In his free time, Dat enjoys hiking and exploring new places.",
    //         joinedDate: "27/07/2023",
    //         staffEmail: "sarahbrown@gmail.com",
    //         staffPhoneNumber: "02195213456"
    //     },
    //     {
    //         staffImage: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    //         staffName: "Tom Wilson",
    //         staffTitle: "Staff",
    //         staffBio: "Dat is a dedicated and hardworking member of our team, with a passion for customer service and problem-solving. He is always eager to lend a hand and goes above and beyond to ensure that every customer has a positive experience. In his free time, Dat enjoys hiking and exploring new places.",
    //         joinedDate: "05/08/2023",
    //         staffEmail: "tomwilson@gmail.com",
    //         staffPhoneNumber: "02195874563"
    //     },
    //     {
    //         staffImage: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    //         staffName: "Karen Thompson",
    //         staffTitle: "Staff",
    //         staffBio: "Dat is a dedicated and hardworking member of our team, with a passion for customer service and problem-solving. He is always eager to lend a hand and goes above and beyond to ensure that every customer has a positive experience. In his free time, Dat enjoys hiking and exploring new places.",
    //         joinedDate: "16/08/2023",
    //         staffEmail: "karenthompson@gmail.com",
    //         staffPhoneNumber: "02195987654"
    //     },
    //     {
    //         staffImage: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    //         staffName: "Michael Kim",
    //         staffTitle: "Staff",
    //         staffBio: "Dat is a dedicated and hardworking member of our team, with a passion for customer service and problem-solving. He is always eager to lend a hand and goes above and beyond to ensure that every customer has a positive experience. In his free time, Dat enjoys hiking and exploring new places.",
    //         joinedDate: "27/08/2023",
    //         staffEmail: "michaelkim@gmail.com",
    //         staffPhoneNumber: "02195678543"
    //     }
    // ];

    const handleClick = (staff) => {
        setCurrentStaff(staff);
        setShowPopup(true);
    }

    function StaffPopup() {

        if (!currentStaff) return
        return (

            <div className="staff-popup">
                <div className="staff-info">
                    <div className="staff-image">
                        <img src={currentStaff.avatar} alt="" />
                    </div>
                    <div className="staff-detailed-info">
                        <div className="staff-name">{currentStaff.firstname} {currentStaff.lastname}</div>
                        <div className="staff-title">{currentStaff.role}</div>


                        <div className="staff-contact">
                            <div className="staff-email">
                                <i class="fa-solid fa-envelope"></i>
                                <p>{currentStaff.email}</p>
                            </div>
                            <div className="staff-phone-number">
                                <i class="fa-solid fa-phone"></i>
                                <p>{currentStaff.phoneNumber ? currentStaff.phoneNumber : ''}</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="staff-bio">
                    <span className="bold">Bio: </span>
                    <p>{currentStaff.bio ? currentStaff.bio : ''}</p>

                </div>
            </div>
        )
    }


    return (
        <div className='StaffViewAllPage'>
            <AddStaffBtn />
            {staffs.map((staff, index) => {
                return (
                    <Staff
                        key={index}
                        staffImage={staff.avatar}
                        staffName={`${staff.firstname} ${staff.lastname}`}
                        staffTitle={staff.role}
                        joinedDate={staff.joinedDate ? staff.joinedDate : '2023'}
                        staffEmail={staff.email}
                        staffPhoneNumber={staff.phonenUmber ? staff.phonenUmber : 'Unknown'}
                        onClick={() => handleClick(staff)}
                    />
                )
            })}


            <Popup
                setShowPopup={setShowPopup}
                showPopup={showPopup}
                children={<StaffPopup />}

            />
        </div>
    )
}