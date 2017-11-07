export class User{
	constructor(
		public _id: string,
		public name: string,
		public email: string,
		public assignment: string,
		public assignment_name: string,
		public password: string,
		public role: string,
		public template:string,
		public file:string
	){}
}