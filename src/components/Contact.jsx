import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_USER_ID')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <div name='contact' className='w-full h-screen bg-[#0a192f] flex justify-center items-center p-4'>
        <form ref={form} onSubmit={sendEmail} className='flex flex-col max-w-[600px] w-full'>
            <div className='pb-8'>
                <p className='text-4xl font-bold inline border-b-4 border-pink-600 text-gray-300'>Contact</p>
                <p className='text-gray-300 py-4'> Submit the form below or shoot me an email - mahta.ir@gmail.com</p>
            </div>
            <input className='bg-[#ccd6f6] p-2' type="text" placeholder='Name' name='name' />
            <input className='my-4 p-2 bg-[#ccd6f6]' type="email" placeholder='Email' name='email' />
            <textarea className='bg-[#ccd6f6] p-2' name="message" rows="10" placeholder='Message'></textarea>
            <button type="submit" className='text-white border-2 hover:bg-pink-600 hover:border-pink-600 px-4 py-3 my-8 mx-auto flex items-center'>Send Email</button>
        </form>
    </div>
  )
}

export default Contact









// const Contact = () => {
//   const form = useRef();
//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs.sendForm('service_wl5sl6s', 'template_srim30x', form.current,'8Zk0ZDdoJ3vFgnpWi')
//     e.target.reset()
//   };

//   return (
//     <section id="contact">
//       <h5>Get in Touch</h5>
//       <h2>Contact me</h2>

//       <div className="container contact__container">
//         <div className="contact__options">
//           <article className="contact__option">
//             <HiOutlineMail className="contact__option-icon"/>
//             <h4>Email</h4>
//             <h5>adamchatila2020@gmail.com</h5>
//             <a href="mailto:adamchatila2020@gmail.com" target="_blank" rel = "noreferrer" >Send a message</a>
//           </article>
//           <article className="contact__option">
//             <BsMessenger className="contact__option-icon"/>
//             <h4>Messanger</h4>
//             <h5>Adam Chatila</h5>
//             <a href="https://m.me/adam.chatila.54" target="_blank" rel = "noreferrer" >Send a message</a>
//           </article>
//           <article className="contact__option">
//             <BsWhatsapp className="contact__option-icon"/>
//             <h4>Whatsapp</h4>
//             <h5>+4528732176</h5>
//             <a href="https://api.whatsapp.com/send?phone=+4528732176" target="_blank" rel = "noreferrer" >Send a message</a>
//           </article>
//         </div>
//         {/*END OF CONTACT OPTEIONS*/}
//         <form ref={form} onSubmit={sendEmail}>
//           <input type="text" name="name" placeholder="Your Full Name" required/>
//           <input type="email" name="email" placeholder="Your Email" required/>
//           <textarea name="message" rows="7" placeholder="Your Message" required/>
//           <button type="submit" class="btn btn-primary">Send Message</button>
//         </form>
//       </div>
//     </section>
//   )
// }

// export default Contact