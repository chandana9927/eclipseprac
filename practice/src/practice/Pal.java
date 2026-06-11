package practice;

public class Pal {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String str = "hello";
		char[] ch = str.toCharArray();
		int i =0,j = ch.length-1;
		while(i<j) {
			if(ch[i]!=ch[j]) {
				System.out.println("not Palindrome");
				break;
			}
			else {
				i++;
				j--;
				System.out.println("pal");
				break;
			}
		}
	}

}
