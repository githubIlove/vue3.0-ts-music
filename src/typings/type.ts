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

export {
	changeTabbar,
	playMusicData
}