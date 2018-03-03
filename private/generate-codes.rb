#!/usr/bin/env ruby

def generate_activation_code(size = 4)
  charset = %w{ 2 3 4 6 7 9 A C D E F G H J K M N P Q R T W X Y Z}
  (0...size).map{ charset.to_a[rand(charset.size)] }.join
end

line_num = 0
text = File.open('guests.txt').read
text.gsub!(/\r\n?/, "\n")
query = "db.guests.insertMany([\n"
codes = [nil]

text.each_line do |line|
  line.gsub!("'", "\'")
  names = line.split
  code = nil
  while codes.include?(code) do
      code = generate_activation_code
  end

  codes.push(code)

  query += "    { first_name: '#{names[0]}', last_name: '#{names[1]}', code: '#{code}',  },\n"
end

query += "])"


puts query