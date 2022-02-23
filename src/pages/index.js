import React from "react"
import {getDbModuleAndDb} from "../utils/firebase"
import { Helmet } from "react-helmet"

import think_icon from "../images/think_icon.png"
import movie_icon from "../images/movie_icon.png"
import point_icon from "../images/point_icon.png"
import favicon16 from "../images/favicon_small.png";
import favicon32 from "../images/favicon_medium.png";
import favicon64 from "../images/favicon_big.png";

import watchphile_text_image from "../images/watchphile_text.png"
import watchphile_image from "../images/watchphile_image.png"
import review_banner from "../images/review_banner.png"
import for_you_banner from "../images/for_you_banner.png"
import check_icon from "../images/check_icon.png"
import reviews_icon from "../images/reviews_icon.png"
import comment_icon from "../images/comment_icon.png"

import icon1 from "../images/waste-of-time.svg"
import icon2 from "../images/search.svg"
import icon3 from "../images/bubble-chat.svg"
import icon4 from "../images/review.svg"

import watchphile_video from "../assets/watchphile_video.mp4"
import { Link } from "gatsby"

function handleClick(e) {
    e.preventDefault();

     const emailInput = document.getElementById("email_input");
     const email = emailInput.value;

     emailInput.value = '';

     getDbModuleAndDb().then(([dbModule, db]) => {
       dbModule.push(dbModule.ref(db, '/waitlist'), {
         email: email
       }).then(snapshot => {
         console.log("succeed")
       }).catch((error) => {
         console.log("error",error);
       });
     }) 
}

//export default function Home() {


export default class HomePage extends React.Component {
    
    constructor(props) {
        super(props);

        console.log("constructor ready");
    }

    componentDidMount(){
        console.log("componentDidMount");

        getDbModuleAndDb().then(([dbModule, db]) => {
           console.log("componentDidMount in callback");
         })
      }

    render() {
        return (
            <div>
                <div className="application">
                    <Helmet
                        title={"Watchphile"}
                        meta={[
                            {
                                name: "description",
                                content: "Watchphile - Find your next movies/tv shows. Tailored for you. Within minute!",
                            },
                            {
                                name: "keywords",
                                content: "watchphile, movies, tv shows",
                            },
                        ]}
                        link={[
                            { rel: "icon", type: "image/png", sizes: "16x16", href: `${favicon16}` },
                            { rel: "icon", type: "image/png", sizes: "32x32", href: `${favicon32}` },
                            { rel: "shortcut icon", type: "image/png", href: `${favicon64}` },
                        ]}
                    />
                </div>

                <header className="sticky z-10 top-0 bg-black filter drop-shadow p-3 px-6 md:px-10 border-b border-gray-300 flex justify-between">
                    <a className="" href="#">
                        <img className="h-8 md:h-8" alt="Watchphile Icon" src={watchphile_text_image}/>
                    </a>
                    <Link to="/blog" className="text-white">Blog</Link>
                </header>

                <section className="text-gray-600 body-font bg-black">
                    <div className="container mx-auto flex flex-col px-5 py-10 justify-center items-center">
                        <img className="mb-4 object-cover object-center rounded h-28 md:h-44" alt="Watchphile Banner" src={watchphile_image}/>
                        <div className="w-full md:w-2/3 flex flex-col mb-12 items-center text-center">
                            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-light text-white">Find your next movies/tv shows. Tailored for you.</h1>
                            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-light text-white">Within minutes. </h1>
                            <p className="mb-4 leading-relaxed text-left font-light text-grey-700">People spend an average of <span className="font-bold text-white">25 minutes</span> each day deciding what to watch! That’s
                                <span className="font-bold text-white"> 152 hours</span> every year! Are you one of them? Don’t worry! Finding the best movies/tv shows is no longer an issue with<span className="font-bold text-white"> Watchphile!</span></p>
                            <p className="mb-8 leading-relaxed text-left font-light text-grey-700">Watchphile will be on the Play Store and App Store soon! If you wanna be the first to know when Watchphile is ready just type your email address here! </p>
                            <div className="md:flex w-full justify-center items-end">
                                <div className="relative md:mr-4 text-left mb-2 md:mb-0">
                                    <input id="email_input" type="email" placeholder="Email me when it’s ready!" name="hero-field" className="w-full bg-grey-600 rounded focus:ring-2 focus:ring-pink-700 focus:bg-transparent border-2 border-pink-700 focus:border-pink-700 text-base outline-none text-white font-thin py-1 px-3 md:pr-48 leading-8 transition-colors duration-200 ease-in-out"/>
                                </div>
                                <button id="email_submit" onClick={handleClick} className="inline-flex text-white text-center font-light bg-pink-700 border-0 py-2 px-6 focus:outline-none active:bg-pink-200 rounded text-lg">JOIN WAITLIST</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="text-gray-600 body-font bg-grey-700">
                    <div id="video_instruction_row" className="container mx-auto px-6 md:px-20 py-10 md:flex md:space-x-4">
                        <div id="video_column" className="w-full md:w-1/2 mb-10 md:mb-0 -mt-20">
                            <video controls>
                                <source src={watchphile_video} type="video/mp4" />
                            </video>
                        </div>
                        <div id="instruction_column" className="w-full lg:flex-grow md:w-1/2 flex flex-col space-y-10 justify-center md:pl-24 text-left">
                            <a className="flex title-font font-medium text-gray-900">
                                <img className="w-6 h-6 mx-1 mt-1" alt="Point Icon" src={point_icon}/>
                                <span className="leading-relaxed font-light text-black text-xl">Finding movies and tv shows that you’ll love</span>
                            </a>
                            <a className="flex title-font font-medium text-gray-900">
                                <img className="w-6 h-6 mt-1" alt="Movie Icon" src={movie_icon}/>
                                <span className="ml-2 leading-relaxed font-light text-black text-xl">Offering reviews on all the latest movies and shows</span>
                            </a>
                            <a className="flex title-font font-medium text-gray-900">
                                <img className="w-6 h-6 mt-1" alt="Think Icon" src={think_icon}/>
                                <span className="ml-2 leading-relaxed font-light text-black text-xl">Sharing your thoughts  - What’s hot and what’s not!</span>
                            </a>
                        </div>
                    </div>
                </section>

                <section className="text-gray-700 body-font bg-grey-600">
                    <div className="container mx-auto flex flex-col px-6 md:px-20 py-20 justify-center items-center">
                        <div className="w-full md:w-2/3 flex flex-col mb-6 items-center text-center">
                            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-semibold text-black">The most fun way to decide <br></br> what to watch!</h1>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 items-start w-full md:space-x-4">
                            <div className="flex flex-col items-center justify-start">
                                <div className="p-4 bg-white border-4 border-pink-200 rounded-full mb-6">
                                    <img className="w-20 h-20" alt="Waste of Time" src={icon1}/>
                                </div>
                                <span className="text-xl md:text-2xl text-gray-700 text-center">No more <br></br> time-wasting!</span>
                            </div>

                            <div className="flex flex-col items-center justify-start">
                                <div className="p-4 bg-white border-4 border-pink-200 rounded-full mb-6">
                                    <img className="w-20 h-20" alt="Waste of Time" src={icon2}/>
                                </div>
                                <span className="text-xl md:text-2xl text-gray-700 text-center">Find good the <br></br> movie/tv show <br></br> tailored for you!</span>
                            </div>

                            <div className="flex flex-col items-center justify-start">
                                <div className="p-4 bg-white border-4 border-pink-200 rounded-full mb-6">
                                    <img className="w-20 h-20" alt="Waste of Time" src={icon3}/>
                                </div>
                                <span className="text-xl md:text-2xl text-gray-700 text-center">Share your <br></br> thoughts with <br></br> other <br></br> watchphiler!</span>
                            </div>

                            <div className="flex flex-col items-center justify-start">
                                <div className="p-4 bg-white border-4 border-pink-200 rounded-full mb-6">
                                    <img className="w-20 h-20" alt="Waste of Time" src={icon4}/>
                                </div>
                                <span className="text-xl md:text-2xl text-gray-700 text-center">Easily find and <br></br> rate high rated <br></br> movies and <br></br> tv shows!</span>
                            </div>
                        </div>

                    </div>
                </section>

                <section className="text-gray-600 body-font bg-grey-700">
                    <div id="for_you_intro_row" className="container mx-auto md:flex md:space-x-10 px-6 md:px-32 py-10 md:py-20 md:flex-row items-center">
                        <div id="for_you_instruction_column" className="md:w-1/2 flex flex-col space-y-8 align-middle justify-center text-left">
                            <a className="flex title-font font-medium text-gray-900">
                                <img className="w-6 h-6" alt="Check Icon" src={check_icon}/>
                                <span className="ml-4 leading-relaxed font-light text-black text-xl">Select your favorite genres</span>
                            </a>
                            <a className="flex title-font font-medium text-gray-900">
                                <img className="w-6 h-6 mt-2" alt="Check Icon" src={check_icon}/>
                                <span className="ml-4  leading-relaxed font-light text-black text-xl">Review the movies or series you both like and dislike. And that's it!</span>
                            </a>
                            <a className="flex title-font font-medium text-gray-900">
                                <img className="w-6 h-6 mt-2" alt="Check Icon" src={check_icon}/>
                                <span className="ml-4  leading-relaxed font-light text-black text-xl">Lean back and enjoy it with a movie and tv show that is special for you!</span>
                            </a>
                        </div>
                        <div id="for_you_intro_image_column" className="md:w-1/2 w-full mt-10 md:mt-0" >
                            <img className="object-cover object-center rounded" alt="For You Banner" src={for_you_banner}/>
                        </div>
                    </div>
                </section>

                <section className="text-gray-700 body-font bg-grey-600">
                    <div id="review_intro_row" className="container mx-auto md:flex md:space-x-10 px-6 md:px-20 py-20">
                        <div id="review_image_column" className="md:w-1/2 w-full md:ml-20 mb-10 md:mb-0" >
                            <img className="md:h-96 object-cover object-center rounded" alt="Review Banner" src={review_banner}/>
                        </div>
                        <div id="review_instruction_column" className="lmd:w-1/2 flex flex-col text-left space-y-4 md:space-y-8 justify-center">
                            <a className="flex title-font font-medium text-gray-900">
                                <img className="w-10 h-10 mx-1" alt="Point Icon" src={point_icon}/>
                                <span className="leading-relaxed font-light text-black text-xl">Extensive and current movies and tv shows details</span>
                            </a>
                            <a className="flex title-font font-medium text-gray-900">
                                <img className="w-10 h-10" alt="Reviews Icon" src={reviews_icon}/>
                                <span className="ml-2 leading-relaxed font-light text-black text-xl">See lots of reviews</span>
                            </a>
                            <a className="flex title-font font-medium text-gray-900">
                                <img className="w-10 h-10" alt="Comment Icon" src={comment_icon}/>
                                <span className="ml-2 leading-relaxed font-light text-black text-xl">If you wanna be part of the Watchphile, leave a comment!</span>
                            </a>
                        </div>
                    </div>
                </section>

                <section className="text-gray-600 body-font bg-black">
                    <div className="container mx-auto flex flex-col px-5 py-10 justify-center items-center">
                        <div className="md:flex w-full justify-center items-center text-center">
                            <div className="relative md:mr-4 mb-4 md:mb-0">
                                <input id="email_input" type="email" placeholder="Email me when it’s ready!" name="hero-field" className="w-full bg-grey-600 rounded focus:ring-2 focus:ring-pink-700 focus:bg-transparent border-2 border-pink-700 focus:border-pink-700 text-base outline-none text-white font-thin py-1 px-3 md:pr-48 leading-8 transition-colors duration-200 ease-in-out"/>
                            </div>
                            <button id="email_submit" onClick={handleClick} className="inline-flex text-white font-light bg-pink-700 border-0 py-2 px-6 focus:outline-none active:bg-pink-200 rounded text-lg">JOIN WAITLIST</button>
                        </div>
                    </div>
                </section>

                <footer className="text-pink-700 body-font">
                    <div className="bg-pink-700">
                        <div className="container mx-auto py-2 px-3 flex flex-wrap flex-col sm:flex-row">
                            <p className="text-grey-900 text-sm text-center sm:text-left pl-5">© Watchphile — 2021</p>
                        </div>
                    </div>
                </footer>

            </div>
        );
    }
}