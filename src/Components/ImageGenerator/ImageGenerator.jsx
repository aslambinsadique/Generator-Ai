import React, { useRef, useState } from 'react';
import '../ImageGenerator/ImageGenerator.css';
import default_image from '../Assets/default_image.svg';

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState('/');
  const [loading,setLoading] = useState(false);
  let inputRef = useRef(null);

  const generateImage = async () => {
    if (inputRef.current.value === '') {
      return 0;
    }
    setLoading(true)

    const response = await fetch(
      'https://api.openai.com/v1/images/generations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer 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',
          'User-Agent': 'chrome',
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: '370x370',
        }),
      }
    );
    let data = await response.json();
    let data_array = data.data;
    setImage_url(data_array.url);
    setLoading(false)
  };

  return (
    <div className='ai-image-generator'>
      <div className="headers">
        <h1>Ai image <span>generator</span></h1>
      </div>
      <div className="image-loding">
        <div className="image">
          <img src={image_url === '/' ? default_image : image_url} alt="" />
        </div>
        <div className="loading">
            <div className={loading?"loading-bar-full":"loading-bar"}></div>
            <div className={loading?"loading-text":"display-none"}>Generating....</div>
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className='search-input'
          placeholder='Describe what you want to see'
        />
        <div className="generate-btn" onClick={generateImage}>
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
