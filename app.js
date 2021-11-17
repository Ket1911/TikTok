const btnToPosts = document.querySelector('.trending-link');
const posts = document.querySelector('.posts-inner');
const prof = document.querySelector('.profile-inner');
const search = document.querySelector('.search-accounts');



btnToPosts.addEventListener('click', function() {
    if (posts.classList.contains('hide')) {
        prof.classList.add('hide');
        posts.classList.remove('hide');
        btnToPosts.classList.add('trending-link--disactive');
        search.value = '';
    }
})

// Posts


class Post {
    constructor(video, avatar, name, text, likes, comments) {
        this.video = video;
        this.avatar = avatar;
        this.name = name;
        this.text = text;
        this.likes = likes;
        this.comments = comments;
        
    }

    add() {
        let post = document.createElement('div');
        post.classList.add('post');
        posts.append(post);

        let photo = document.createElement('img');
        photo.src = this.avatar;
        photo.classList.add('post-photo');
        post.append(photo);

        let content = document.createElement('div');
        content.classList.add('post-content');
        post.append(content);

        let name = document.createElement('div');
        name.classList.add('post-name');
        name.textContent = this.name;
        content.append(name);

        let text = document.createElement('div');
        text.classList.add('post-text');
        text.textContent = this.text;
        content.append(text);

        let videoWrapper = document.createElement('div');
        videoWrapper.classList.add('post-wrapper');
        content.append(videoWrapper);

        let video = document.createElement('video');
        video.src = this.video;
        video.controls = 'controls';
        video.loop = "loop";
        video.classList.add('post-video');
        videoWrapper.append(video);

        let icons = document.createElement('div');
        icons.classList.add('post-icons');
        videoWrapper.append(icons);

        let likes = document.createElement('div');
        likes.classList.add('post-likes');
        icons.append(likes);

        let likesCount = document.createElement('div');
        likesCount.classList.add('post-count');
        if (this.likes > 1000 && this.likes < 1000000) {
            this.likes = `${Math.floor(this.likes/100)/10}K`
        } else if (this.likes > 1000000) {
            this.likes = `${Math.floor(this.likes/100000)/10}M`
        }
        likesCount.textContent = this.likes;
        icons.append(likesCount);

        let comments = document.createElement('div');
        comments.classList.add('post-comments');
        icons.append(comments);

        let commentsCount = document.createElement('div');
        commentsCount.classList.add('post-count');
        if (this.comments > 1000 && this.comments < 1000000) {
            this.comments = `${Math.floor(this.comments/100)/10}K`
        } else if (this.comments > 1000000) {
            this.comments = `${Math.floor(this.comments/100000)/10}M`
        }
        commentsCount.textContent = this.comments;
        icons.append(commentsCount);
    }
}

function createPost(video, avatar, name, text, likes, comments) {
    if (posts) {
        let post = new Post(video, avatar, name, text, likes, comments);
        post.add();
        
    }
}

posts.textContent = 'Loading....';

fetch("https://tiktok33.p.rapidapi.com/trending/feed", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "tiktok33.p.rapidapi.com",
        "x-rapidapi-key": "b058652ad4mshf15a4f63db6d0e4p16e2f4jsn04a7c07e223a"
    }
})
.then(response => response.json())
.then(commits => {
        posts.textContent = '';
    for (let i = 0; i < commits.length; i++) {
        createPost(commits[i].videoUrl, commits[i].authorMeta.avatar, commits[i].authorMeta.name, commits[i].text, commits[i].diggCount, commits[i].commentCount)
    }
    
    
})
.catch(err => {
    console.log('many requasts');
            
})



       
function checkScroll() {
    if (!posts.classList.contains('hide')) {
        let videos = document.getElementsByTagName("video");
        for (let i = 0; i < videos.length; i++) {
            let video = videos[i];
            if (video) {
                if (video.getBoundingClientRect().top < 0 || video.getBoundingClientRect().bottom < 0 || video.getBoundingClientRect().bottom > document.documentElement.clientHeight) {
                    let playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                        video.pause();
                        })
                        .catch(error => {
                            
                        });
                    }
                    
                    
                    // video.pause();
                } else if (video.getBoundingClientRect().top > 0 && video.getBoundingClientRect().bottom > 0 && video.getBoundingClientRect().bottom < document.documentElement.clientHeight) {
                   
 
                    let playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            video.play();
                        })
                        .catch(error => {
                            
                        });
                    }
                    
                    
                    // video.play();
                }
            }
        }
    }
}

window.addEventListener('scroll', checkScroll, false);
window.addEventListener('resize', checkScroll, false);
window.addEventListener('load', checkScroll, false);



  // Profile





function searchProfile (event) {
    if (event.code === 'Enter' ) {
        if (prof.classList.contains('hide')) {
            prof.classList.remove('hide');
            posts.classList.add('hide');
            btnToPosts.classList.remove('trending-link--disactive');

            let videos = document.getElementsByTagName("video");

            for (let i = 0; i < videos.length; i++) {
                let video = videos[i];
                if (video) {
                    video.pause();
                }
            }
        }

        prof.innerHTML = '';
        

        getProfile(search.value);
        loadVideous(search.value);
    }
}

search.addEventListener('keypress', searchProfile);



 

    

class Profile {
    constructor(photo, name, nickname, following, follower, likes) {
        this.photo = photo;
        this.name = name;
        this.nickname = nickname;
        this.following = following;
        this.follower = follower;
        this.likes = likes;
    }

    create() {
        let info = document.createElement('div');
        info.classList.add('profile-info');
        prof.prepend(info);

        let photo = document.createElement('img');
        photo.src = this.photo;
        photo.classList.add('profile-photo');
        info.append(photo);

        let nameWrapper = document.createElement('div');
        nameWrapper.classList.add('profile-name-wrapper');
        info.append(nameWrapper);

        let name = document.createElement('div');
        name.classList.add('profile-name');
        name.textContent = this.name;
        nameWrapper.append(name);

        let nickname = document.createElement('div');
        nickname.classList.add('profile-nickname');
        nickname.textContent = this.nickname;
        nameWrapper.append(nickname);

        let countInfo = document.createElement('div');
        countInfo.classList.add('profile-count-info');
        nameWrapper.append(countInfo);

        let countFollowing = document.createElement('div');
        countFollowing.classList.add('profile-count');
        if (this.following > 1000 && this.following < 1000000) {
            this.following = `${Math.floor(this.following/100)/10}K`
        } else if (this.following > 1000000) {
            this.following = `${Math.floor(this.following/100000)/10}M`
        }
        countFollowing.textContent = this.following;
        countInfo.append(countFollowing);

        let countFollowingText = document.createElement('div');
        countFollowingText.classList.add('profile-text');
        countFollowingText.textContent = 'Following';
        countInfo.append(countFollowingText);

        let countFollower = document.createElement('div');
        countFollower.classList.add('profile-count');
        if (this.follower > 1000 && this.follower < 1000000) {
            this.follower = `${Math.floor(this.follower/100)/10}K`
        } else if (this.follower > 1000000) {
            this.follower = `${Math.floor(this.follower/100000)/10}M`
        }
        countFollower.textContent = this.follower;
        countInfo.append(countFollower);

        let countFollowerText = document.createElement('div');
        countFollowerText.classList.add('profile-text');
        countFollowerText.textContent = 'Followers';
        countInfo.append(countFollowerText);

        let countLikes = document.createElement('div');
        countLikes.classList.add('profile-count');
        if (this.likes > 1000 && this.likes < 1000000) {
            this.likes = `${Math.floor(this.likes/100)/10}K`
        } else if (this.likes > 1000000) {
            this.likes = `${Math.floor(this.likes/100000)/10}M`
        }
        countLikes.textContent = this.likes;
        countInfo.append(countLikes);

        let countLikesText = document.createElement('div');
        countLikesText.classList.add('profile-text');
        countLikesText.textContent = 'Likes';
        countInfo.append(countLikesText);
    }

}

    
       
    
function createProfile(photo, name, nickname, following, follower, likes) {
    
    if (prof) {
        let pro = new Profile(photo, name, nickname, following, follower, likes);
        pro.create();
    }
}
 
function getProfile(name) {
    fetch(`https://tiktok33.p.rapidapi.com/user/info/${name}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "tiktok33.p.rapidapi.com",
		"x-rapidapi-key": "b058652ad4mshf15a4f63db6d0e4p16e2f4jsn04a7c07e223a"
	}
    })
    .then(response => response.json())
    .then(profile => createProfile(profile.user.avatarMedium, profile.user.uniqueId, profile.user.nickname, profile.stats.followingCount, profile.stats.followerCount, profile.stats.heartCount))
    .catch(err => {
            
        console.error(err);
    });
}



function addVideo(link, views) {
    const videoContainer = document.querySelector('.video-container');
    let videoWrapper = document.createElement('div');
    
    videoWrapper.classList.add('video-wrapper');
    videoContainer.append(videoWrapper);

    // console.log(link)
    let video = document.createElement('video');
    video.src = link;
    video.controls = 'controls';
    video.loop = "loop";
    video.classList.add('profile-video');
    videoWrapper.append(video);  
    

    if (views > 1000 && views < 1000000) {
        views = `${Math.floor(views/100)/10}K`
    } else if (views > 1000000) {
        views = `${Math.floor(views/100000)/10}M`
    }

    let play = document.createElement('div');
    play.textContent = views;
    play.classList.add('profile-views');
    videoWrapper.append(play);

}

function loadVideous(name) {

    let videoContainer = document.createElement('div');
    
    videoContainer.classList.add('video-container');
    prof.append(videoContainer);

    videoContainer.textContent= 'Loading....';

    fetch(`https://tiktok-best-experience.p.rapidapi.com/user/${name}/feed?max_cursor=1630342868000`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "tiktok-best-experience.p.rapidapi.com",
		"x-rapidapi-key": "b058652ad4mshf15a4f63db6d0e4p16e2f4jsn04a7c07e223a"
	}
    })
    .then(response => response.json())
    .then(profile => {
        videoContainer.textContent= '';

        for (let i = 0; i < profile.data.aweme_list.length; i++) {
            addVideo(profile.data.aweme_list[i].video.play_addr.url_list[0], profile.data.aweme_list[i].statistics.play_count);
            
        }

    })
    .catch(err => {
        console.error(err);
    });

}



function checkHover() {
    if (posts.classList.contains('hide')) {
        let videos = document.getElementsByTagName("video");

        for (let i = 0; i < videos.length; i++) {

            let video = videos[i];
            video.addEventListener('mouseover', function() {
                

                let playPromise = this.play();;
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            for (let y = 0; y < video.length; y++) {
                                video[y].pause();
                            }
                            this.play();
                        })
                        .catch(error => {
                            
                        });
                    }
                // this.play();
            })
            video.addEventListener('mouseout', function() {

                let playPromise = this.play();;
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        this.pause();
                    })
                    .catch(error => {
                        
                    });
                }
                // this.pause();
            })
        }
    }
}



window.addEventListener('mousemove', checkHover);


const postNames = document.querySelectorAll('.post-name');

function openProfile(e) {

        if (e.target.classList.contains('post-name')) {
            if (prof.classList.contains('hide')) {
                prof.classList.remove('hide');
                posts.classList.add('hide');
                btnToPosts.classList.remove('trending-link--disactive');
    
                let videos = document.getElementsByTagName("video");
    
                for (let i = 0; i < videos.length; i++) {
                    let video = videos[i];
                    if (video) {
                        video.pause();
                    }
                }
            }
    
            prof.innerHTML = '';
            
            // console.log(e.target.textContent)
            getProfile(e.target.textContent);
            loadVideous(e.target.textContent);
        }    
        
        if (e.target.classList.contains('post-photo')) {
            if (prof.classList.contains('hide')) {
                prof.classList.remove('hide');
                posts.classList.add('hide');
                btnToPosts.classList.remove('trending-link--disactive');
    
                let videos = document.getElementsByTagName("video");
    
                for (let i = 0; i < videos.length; i++) {
                    let video = videos[i];
                    if (video) {
                        video.pause();
                    }
                }
            }
    
            prof.innerHTML = '';
            
            getProfile(e.target.parentElement.children[1].children[0].textContent);
            loadVideous(e.target.parentElement.children[1].children[0].textContent);
            
        }
  
}



posts.addEventListener('click', openProfile)


    