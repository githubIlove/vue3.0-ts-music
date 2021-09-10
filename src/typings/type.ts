// 底部导航
interface changeTabbar {
	id: number;
	path: string;
	name: string;
	active: string;
	inactive: string;
}

// playMusic中的reactive、
interface playMusicData{
	song_url:string,
	play_state:boolean
}



// 播放音乐时  需要设置的缓存

interface playSongLocal{
	id:string,
	name:string,
	songUrl:string,
	picture:string,
	singer:string,
	currentTime:number | string,
}

export {
	changeTabbar,
	playMusicData,
	playSongLocal,
}