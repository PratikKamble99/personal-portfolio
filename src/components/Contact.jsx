import React from 'react'
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../style';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

const Contact = () => {
  const formRef = React.useRef()
  const [isSent, setIsSent] = React.useState(false);
  const [form, setForm] = React.useState({
    name:'',
    email:'',
    message:'',
  });

  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({...form, [name]:value})
    
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs.send(
      import.meta.env.VITE_EMAIL_JS_SERVICE_KEY, 
      import.meta.env.VITE_EMAIL_JS_TEMPLATE_KEY, 
      { 
        from_name: form.name,
        to_name: 'Pratik Kamble',
        from_email: form.email,
        to_email:import.meta.env.VITE_EMAIL_JS_TO_EMAIL,
        message: form.message
      },
      'DyLtGTRbtEuUC0G_S'
    ).then(()=>{
      setLoading(false);
      alert('Thank you. I will get back to you as soon as possible,');
      setForm({
        name:'',
        email:'',
        message:'',
      })
    }, (error)=>{
      setLoading(false);
      console.log(error);
      alert('something went wrong.')
    }); 
  }

  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn('left','tween', 0.2, 1)}
        className="flex-[0.75] bg-black-300 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}> Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-1">Your Name</span>
          </label>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="What's your name" className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"/>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-1">Your Email</span>
          </label>
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="What's your email" className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"/>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-1">Message</span>
          </label>
          <textarea name="message" rows={7} value={form.message} onChange={handleChange} placeholder="What do want to say" className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"/>
          <button type="submit" className="bg-tertiary px-8 rounded-md py-3 outlined-none w-fit text-white shadow-md shadow-primary">{loading ? 'sending' : 'send'}</button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn('right','tween', 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[360px]'
      >
        <EarthCanvas/>
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact,"contact");