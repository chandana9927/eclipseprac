package practice;

public class ArrayAdj {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String str = "Hi Hi hello are";
		String[] s = str.split(" ");
		for(int i = 0; i< s.length-1; i++) {
			if(s[i] == s[i+1]) {
				System.out.print(s[i]);
			}
		}
		System.out.println(s[s.length-1]);

	}

}
