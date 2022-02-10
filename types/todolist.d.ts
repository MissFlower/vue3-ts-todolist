export interface ITodo {
	id: string
	checked: boolean
	edited: boolean
	value: string
}

export interface IState {
	allLists: ITodo[]
	lists: ITodo[]
}
