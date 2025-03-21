import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';


const CreatePost = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
    });
    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (form.prompt && form.photo) {
            setLoading(true);
            try {
                const response = await fetch ('http://localhost:3000/api/v1/posts', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(form), 
                })
                await response.json();
                navigate('/');
            } catch (error) {
                alert(error);              
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please provide a prompt and an image');
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({ ...form, prompt: randomPrompt })
    }

    const generateImage = async () => {
        if (form.prompt){
            try {
                setGeneratingImg(true);
                const response = await fetch('http://localhost:3000/api/v1/artSquirt', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({ prompt: form.prompt }),
                })
                const data = await response.json();
                setForm({ ...form, photo: `data:image/jpeg;base64,${data.art}`})
            } catch (error) {
                alert(error);
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert('Please provide a prompt');
        }
    }


    return (
        <section className='max-w-7xl mx-auto'>
            <div>
                <h1 className='font-extrabold text-[#222328] text-[32px]'>Create</h1>
                <p className='mt-2 text-[#666e75] text-[22px] min-w-[500px]'>Create an imaginative and visually stunning images generated by <span className='text-white font-bold text-4xl'>A</span>rt<span className='text-white font-bold text-4xl'>S</span>quirt AI</p>
            </div>
            <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-5'>
                    <FormField 
                        LabelName = "Name"
                        type = "text"
                        name = "name"
                        placeholder = "John Doe"
                        value = {form.name}
                        handleChange = {handleChange}
                    />
                    <FormField
                        LabelName = "Prompt"
                        type = "text"
                        name = "prompt"
                        placeholder = "A comic book cover of a superhero wearing headphones"
                        value = {form.prompt}
                        handleChange = {handleChange}
                        isSurpriseMe
                        handleSurpriseMe = {handleSurpriseMe}
                    />
                    <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black w-64 p-3 h-64 flex justify-center items-center'>
                        {form.photo ? (
                            <img 
                                src = {form.photo}
                                alt = {form.prompt}
                                className='w-full h-full object-contain'
                            />
                        ) : (
                            <img
                                src = {preview}
                                alt = "preview"
                                className='w-9/12 h-9/12 object-contain opacity-15'
                            />
                        )}

                        {generatingImg && (
                            <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
                <div className='mt-5 flex gap-5'>
                    <button
                        type = "button"
                        onClick = {generateImage} 
                        className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:2-auto px-5 py-2.5 text-center'
                        >
                            {generatingImg ? 'Generating...' : 'Generate'}
                    </button>
                </div>
                <div className='mt-10'>
                    <p className="mt-2 text-white text-[18px] ">Generate image, and share it with others in the community.</p>
                    <button 
                        type="submit"
                        className='mt-3 text-white bg-[#ffa371] font-medium rounded-md text-sm w-full sm:w-auto px-3 py-2.5 text-center'>
                        {loading ? 'Sharing...' : 'Share with others in the community'}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CreatePost
